#!/bin/bash

################################################################################
# Database Backup Script
# Automated daily backup of PostgreSQL database to AWS S3
#
# Usage: ./backup-database.sh
#
# Environment Variables Required:
# - DATABASE_URL: PostgreSQL connection string
# - AWS_ACCESS_KEY_ID: AWS credentials
# - AWS_SECRET_ACCESS_KEY: AWS credentials
# - S3_BACKUP_BUCKET: S3 bucket for backups (e.g., my-backups)
# - BACKUP_RETENTION_DAYS: Days to keep backups (default: 30)
################################################################################

set -e  # Exit on error

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="${SCRIPT_DIR}/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="dr-platform-backup-${TIMESTAMP}.sql.gz"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_FILE}"
LOG_FILE="${BACKUP_DIR}/backup-${TIMESTAMP}.log"

# Environment defaults
BACKUP_RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-30}
S3_BACKUP_BUCKET=${S3_BACKUP_BUCKET:-"dr-platform-backups"}
S3_BACKUP_PREFIX=${S3_BACKUP_PREFIX:-"database"}

# Ensure backup directory exists
mkdir -p "${BACKUP_DIR}"

# Logging function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "${LOG_FILE}"
}

log "=========================================="
log "Starting Database Backup"
log "=========================================="
log "Backup file: ${BACKUP_FILE}"
log "Timestamp: ${TIMESTAMP}"

# Validate environment
if [ -z "$DATABASE_URL" ]; then
    log "ERROR: DATABASE_URL environment variable is not set"
    exit 1
fi

if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
    log "ERROR: AWS credentials are not set"
    exit 1
fi

# Parse PostgreSQL connection string
if [[ $DATABASE_URL =~ postgresql://([^:]+):([^@]+)@([^:]+):([0-9]+)/(.+) ]]; then
    DB_USER="${BASH_REMATCH[1]}"
    DB_PASSWORD="${BASH_REMATCH[2]}"
    DB_HOST="${BASH_REMATCH[3]}"
    DB_PORT="${BASH_REMATCH[4]}"
    DB_NAME="${BASH_REMATCH[5]}"
else
    log "ERROR: Unable to parse DATABASE_URL"
    exit 1
fi

log "Database: ${DB_HOST}:${DB_PORT}/${DB_NAME}"

# Create backup
log "Creating database backup..."
PGPASSWORD="${DB_PASSWORD}" pg_dump \
    --host="${DB_HOST}" \
    --port="${DB_PORT}" \
    --username="${DB_USER}" \
    --dbname="${DB_NAME}" \
    --verbose \
    --no-password \
    2>> "${LOG_FILE}" | gzip > "${BACKUP_PATH}"

if [ ! -f "${BACKUP_PATH}" ]; then
    log "ERROR: Backup file was not created"
    exit 1
fi

BACKUP_SIZE=$(du -h "${BACKUP_PATH}" | cut -f1)
log "Backup created successfully: ${BACKUP_SIZE}"

# Upload to S3
log "Uploading to S3..."
S3_PATH="s3://${S3_BACKUP_BUCKET}/${S3_BACKUP_PREFIX}/${BACKUP_FILE}"

aws s3 cp "${BACKUP_PATH}" "${S3_PATH}" \
    --region "${AWS_REGION:-ap-southeast-2}" \
    --storage-class STANDARD_IA \
    --metadata "backup-date=${TIMESTAMP},database=${DB_NAME}" \
    >> "${LOG_FILE}" 2>&1

if [ $? -ne 0 ]; then
    log "ERROR: Failed to upload backup to S3"
    exit 1
fi

log "Successfully uploaded to ${S3_PATH}"

# Verify upload
log "Verifying S3 upload..."
if aws s3 ls "${S3_PATH}" --region "${AWS_REGION:-ap-southeast-2}" > /dev/null 2>&1; then
    log "S3 upload verified successfully"
else
    log "ERROR: S3 upload verification failed"
    exit 1
fi

# Create backup metadata
METADATA_FILE="${BACKUP_DIR}/${BACKUP_FILE}.metadata"
cat > "${METADATA_FILE}" <<EOF
{
  "backup_file": "${BACKUP_FILE}",
  "timestamp": "${TIMESTAMP}",
  "database": "${DB_NAME}",
  "host": "${DB_HOST}",
  "port": "${DB_PORT}",
  "size": "${BACKUP_SIZE}",
  "s3_path": "${S3_PATH}",
  "retention_days": ${BACKUP_RETENTION_DAYS},
  "status": "success"
}
EOF

# Upload metadata
aws s3 cp "${METADATA_FILE}" "s3://${S3_BACKUP_BUCKET}/${S3_BACKUP_PREFIX}/${BACKUP_FILE}.metadata" \
    --region "${AWS_REGION:-ap-southeast-2}" \
    >> "${LOG_FILE}" 2>&1

log "Backup metadata saved"

# Cleanup old local backups (keep 7 days locally)
log "Cleaning up old local backups..."
find "${BACKUP_DIR}" -name "dr-platform-backup-*.sql.gz" -mtime +7 -delete

# Cleanup old S3 backups (keep 30 days)
log "Cleaning up old S3 backups..."
aws s3 ls "s3://${S3_BACKUP_BUCKET}/${S3_BACKUP_PREFIX}/" --region "${AWS_REGION:-ap-southeast-2}" | while read -r date time size file; do
    FILE_DATE=$(echo $file | grep -oP 'backup-\K[0-9]{8}' || true)
    if [ -n "$FILE_DATE" ]; then
        FILE_TIMESTAMP=$(date -d "${FILE_DATE}" +%s 2>/dev/null || echo 0)
        CUTOFF_TIMESTAMP=$(date -d "${BACKUP_RETENTION_DAYS} days ago" +%s 2>/dev/null || echo 0)

        if [ $FILE_TIMESTAMP -lt $CUTOFF_TIMESTAMP ]; then
            aws s3 rm "s3://${S3_BACKUP_BUCKET}/${S3_BACKUP_PREFIX}/${file}" \
                --region "${AWS_REGION:-ap-southeast-2}" \
                >> "${LOG_FILE}" 2>&1
            log "Removed old backup: ${file}"
        fi
    fi
done

log "=========================================="
log "Backup Completed Successfully"
log "=========================================="
log "Backup file: ${BACKUP_FILE}"
log "Size: ${BACKUP_SIZE}"
log "Location: ${S3_PATH}"
log "Log: ${LOG_FILE}"

exit 0
