#!/bin/bash

################################################################################
# Database Restore Script
# Restores PostgreSQL database from backup (local or S3)
#
# Usage: ./restore-database.sh <backup-file|s3-path> [--dry-run]
#
# Examples:
#   ./restore-database.sh dr-platform-backup-20240115_143022.sql.gz
#   ./restore-database.sh s3://dr-platform-backups/database/dr-platform-backup-20240115_143022.sql.gz
#   ./restore-database.sh dr-platform-backup-20240115_143022.sql.gz --dry-run
#
# Environment Variables Required:
# - DATABASE_URL: PostgreSQL connection string
# - AWS_ACCESS_KEY_ID: AWS credentials (if restoring from S3)
# - AWS_SECRET_ACCESS_KEY: AWS credentials (if restoring from S3)
# - S3_BACKUP_BUCKET: S3 bucket (if restoring from S3)
#
# DANGER: This will overwrite the current database!
################################################################################

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="${SCRIPT_DIR}/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RESTORE_LOG="${BACKUP_DIR}/restore-${TIMESTAMP}.log"
DRY_RUN=false

# Arguments
BACKUP_SOURCE="${1:-}"
if [ "${2:-}" == "--dry-run" ]; then
    DRY_RUN=true
fi

# Logging
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "${RESTORE_LOG}"
}

log "=========================================="
log "Database Restoration Script"
log "=========================================="
log "Dry Run: ${DRY_RUN}"

if [ -z "$BACKUP_SOURCE" ]; then
    log "ERROR: Backup source not specified"
    log "Usage: $0 <backup-file|s3-path> [--dry-run]"
    exit 1
fi

# Validate environment
if [ -z "$DATABASE_URL" ]; then
    log "ERROR: DATABASE_URL environment variable is not set"
    exit 1
fi

# Parse connection string
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

log "Target Database: ${DB_HOST}:${DB_PORT}/${DB_NAME}"

# Locate backup file
BACKUP_PATH=""
if [[ $BACKUP_SOURCE == s3://* ]]; then
    log "Downloading backup from S3: ${BACKUP_SOURCE}"

    if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
        log "ERROR: AWS credentials not set"
        exit 1
    fi

    BACKUP_PATH="/tmp/restore-backup-$$.sql.gz"
    aws s3 cp "${BACKUP_SOURCE}" "${BACKUP_PATH}" --region us-east-1 >> "${RESTORE_LOG}" 2>&1

    if [ ! -f "$BACKUP_PATH" ]; then
        log "ERROR: Failed to download backup from S3"
        exit 1
    fi

    log "✓ Backup downloaded to: ${BACKUP_PATH}"
else
    BACKUP_PATH="${BACKUP_DIR}/${BACKUP_SOURCE}"
fi

# Verify backup exists
if [ ! -f "$BACKUP_PATH" ]; then
    log "ERROR: Backup file not found: ${BACKUP_PATH}"
    exit 1
fi

BACKUP_SIZE=$(du -h "$BACKUP_PATH" | cut -f1)
log "Backup file: $(basename $BACKUP_PATH)"
log "Backup size: ${BACKUP_SIZE}"

# Verify backup integrity
log "Verifying backup integrity..."
if ! gzip -t "$BACKUP_PATH"; then
    log "ERROR: Backup file is corrupted"
    exit 1
fi
log "✓ Backup file integrity verified"

if [ "$DRY_RUN" == "true" ]; then
    log "=========================================="
    log "DRY RUN COMPLETE"
    log "=========================================="
    log "Backup is valid and ready to restore"
    log "To perform actual restore, run without --dry-run"
    exit 0
fi

# Safety confirmation
log "=========================================="
log "DANGER: This will OVERWRITE the current database!"
log "=========================================="
log "Target: ${DB_HOST}:${DB_PORT}/${DB_NAME}"
log "Backup: $(basename $BACKUP_PATH)"
log ""
log "Type 'RESTORE' to continue (or anything else to cancel):"
read -r CONFIRM

if [ "$CONFIRM" != "RESTORE" ]; then
    log "Restore cancelled by user"
    exit 0
fi

log "User confirmed restore. Proceeding..."

# Create backup of current database (safety measure)
log "Creating safety backup of current database..."
SAFETY_BACKUP="${BACKUP_DIR}/safety-backup-${TIMESTAMP}.sql.gz"
PGPASSWORD="${DB_PASSWORD}" pg_dump \
    --host="${DB_HOST}" \
    --port="${DB_PORT}" \
    --username="${DB_USER}" \
    --dbname="${DB_NAME}" \
    2>> "${RESTORE_LOG}" | gzip > "${SAFETY_BACKUP}"

log "✓ Safety backup created: $(basename $SAFETY_BACKUP)"

# Drop existing database connections
log "Terminating existing database connections..."
PGPASSWORD="${DB_PASSWORD}" psql \
    --host="${DB_HOST}" \
    --port="${DB_PORT}" \
    --username="${DB_USER}" \
    --dbname="postgres" \
    -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '${DB_NAME}' AND pid <> pg_backend_pid();" \
    >> "${RESTORE_LOG}" 2>&1

# Drop and recreate database
log "Dropping current database..."
PGPASSWORD="${DB_PASSWORD}" psql \
    --host="${DB_HOST}" \
    --port="${DB_PORT}" \
    --username="${DB_USER}" \
    --dbname="postgres" \
    -c "DROP DATABASE IF EXISTS ${DB_NAME};" \
    >> "${RESTORE_LOG}" 2>&1

log "Creating new database..."
PGPASSWORD="${DB_PASSWORD}" psql \
    --host="${DB_HOST}" \
    --port="${DB_PORT}" \
    --username="${DB_USER}" \
    --dbname="postgres" \
    -c "CREATE DATABASE ${DB_NAME};" \
    >> "${RESTORE_LOG}" 2>&1

# Restore from backup
log "Restoring database from backup..."
START_TIME=$(date +%s)

gzip -cd "$BACKUP_PATH" | PGPASSWORD="${DB_PASSWORD}" psql \
    --host="${DB_HOST}" \
    --port="${DB_PORT}" \
    --username="${DB_USER}" \
    --dbname="${DB_NAME}" \
    >> "${RESTORE_LOG}" 2>&1

RESTORE_STATUS=$?
END_TIME=$(date +%s)
RESTORE_DURATION=$((END_TIME - START_TIME))

if [ $RESTORE_STATUS -ne 0 ]; then
    log "ERROR: Database restore failed"
    log "Duration: ${RESTORE_DURATION} seconds"
    log "Safety backup available at: ${SAFETY_BACKUP}"
    exit 1
fi

log "✓ Database restore completed successfully"
log "Duration: ${RESTORE_DURATION} seconds"

# Verify restore
log "Verifying restore..."
TABLE_COUNT=$(PGPASSWORD="${DB_PASSWORD}" psql \
    --host="${DB_HOST}" \
    --port="${DB_PORT}" \
    --username="${DB_USER}" \
    --dbname="${DB_NAME}" \
    -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" | tr -d ' ')

log "✓ Restored database has ${TABLE_COUNT} tables"

# Cleanup temp file
if [[ $BACKUP_SOURCE == s3://* ]] && [ -f "$BACKUP_PATH" ]; then
    rm -f "$BACKUP_PATH"
fi

log "=========================================="
log "Database Restore Completed Successfully"
log "=========================================="
log "Restored database: ${DB_NAME}"
log "Number of tables: ${TABLE_COUNT}"
log "Restore duration: ${RESTORE_DURATION} seconds"
log "Safety backup: $(basename $SAFETY_BACKUP)"
log "Restore log: ${RESTORE_LOG}"

exit 0
