#!/bin/bash

################################################################################
# Backup Verification Script
# Verifies backup integrity and restorability
#
# Usage: ./verify-backup.sh <backup-file> [test-database]
#
# Environment Variables Required:
# - DATABASE_URL: PostgreSQL connection string (for test restore)
# - AWS_ACCESS_KEY_ID: AWS credentials
# - AWS_SECRET_ACCESS_KEY: AWS credentials
# - S3_BACKUP_BUCKET: S3 bucket for backups
################################################################################

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="${SCRIPT_DIR}/backups"
VERIFY_LOG="${BACKUP_DIR}/verify-$(date +%Y%m%d_%H%M%S).log"

# Arguments
BACKUP_FILE="${1:-}"
TEST_DB="${2:-test_restore_db}"

# Logging
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "${VERIFY_LOG}"
}

log "=========================================="
log "Starting Backup Verification"
log "=========================================="

if [ -z "$BACKUP_FILE" ]; then
    log "ERROR: Backup file not specified"
    log "Usage: $0 <backup-file> [test-database]"
    exit 1
fi

# Determine if backup is local or in S3
if [[ $BACKUP_FILE == s3://* ]]; then
    log "Verifying S3 backup: ${BACKUP_FILE}"

    # Download backup
    TEMP_BACKUP="/tmp/verify-backup-$$.sql.gz"
    log "Downloading from S3..."
    aws s3 cp "${BACKUP_FILE}" "${TEMP_BACKUP}" --region us-east-1
    BACKUP_PATH="${TEMP_BACKUP}"
else
    BACKUP_PATH="${BACKUP_DIR}/${BACKUP_FILE}"
fi

if [ ! -f "$BACKUP_PATH" ]; then
    log "ERROR: Backup file not found: ${BACKUP_PATH}"
    exit 1
fi

# Verify backup file integrity
log "Verifying backup file integrity..."
if gzip -t "$BACKUP_PATH"; then
    log "✓ Backup file is valid gzip"
else
    log "✗ Backup file is corrupted"
    exit 1
fi

# Check file size
FILE_SIZE=$(du -h "$BACKUP_PATH" | cut -f1)
log "✓ Backup file size: ${FILE_SIZE}"

# Verify backup content (list tables)
log "Verifying backup content..."
if gzip -cd "$BACKUP_PATH" | head -1000 | grep -q "^--"; then
    log "✓ Backup contains SQL dump headers"
else
    log "✗ Backup does not appear to be valid SQL dump"
    exit 1
fi

# Count tables in backup
TABLE_COUNT=$(gzip -cd "$BACKUP_PATH" | grep -c "^CREATE TABLE" || true)
log "✓ Found ${TABLE_COUNT} tables in backup"

# Verify specific critical tables
CRITICAL_TABLES=("User" "Payment" "ServiceRequest" "Contractor")
for table in "${CRITICAL_TABLES[@]}"; do
    if gzip -cd "$BACKUP_PATH" | grep -q "CREATE TABLE.*\"${table}\""; then
        log "✓ Critical table found: ${table}"
    else
        log "⚠ Critical table not found: ${table}"
    fi
done

# Test restore to temporary database (if TEST_RESTORE=true)
if [ "${TEST_RESTORE:-false}" == "true" ]; then
    log "=========================================="
    log "Testing Restore to Temporary Database"
    log "=========================================="

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

    log "Creating temporary test database: ${TEST_DB}"
    PGPASSWORD="${DB_PASSWORD}" psql \
        --host="${DB_HOST}" \
        --port="${DB_PORT}" \
        --username="${DB_USER}" \
        --dbname="postgres" \
        -c "DROP DATABASE IF EXISTS ${TEST_DB};" \
        -c "CREATE DATABASE ${TEST_DB};" \
        >> "${VERIFY_LOG}" 2>&1

    log "Restoring backup to test database..."
    gzip -cd "$BACKUP_PATH" | PGPASSWORD="${DB_PASSWORD}" psql \
        --host="${DB_HOST}" \
        --port="${DB_PORT}" \
        --username="${DB_USER}" \
        --dbname="${TEST_DB}" \
        >> "${VERIFY_LOG}" 2>&1

    if [ $? -eq 0 ]; then
        log "✓ Restore test successful"

        # Verify table counts
        TEST_TABLE_COUNT=$(PGPASSWORD="${DB_PASSWORD}" psql \
            --host="${DB_HOST}" \
            --port="${DB_PORT}" \
            --username="${DB_USER}" \
            --dbname="${TEST_DB}" \
            -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" | tr -d ' ')

        log "✓ Test database has ${TEST_TABLE_COUNT} tables"

        # Cleanup test database
        log "Cleaning up test database..."
        PGPASSWORD="${DB_PASSWORD}" psql \
            --host="${DB_HOST}" \
            --port="${DB_PORT}" \
            --username="${DB_USER}" \
            --dbname="postgres" \
            -c "DROP DATABASE ${TEST_DB};" \
            >> "${VERIFY_LOG}" 2>&1
    else
        log "✗ Restore test failed"
        exit 1
    fi
fi

# Cleanup temp file
if [[ $BACKUP_FILE == s3://* ]] && [ -f "$TEMP_BACKUP" ]; then
    rm -f "$TEMP_BACKUP"
fi

log "=========================================="
log "Backup Verification Complete"
log "=========================================="
log "Status: PASSED"
log "Verification log: ${VERIFY_LOG}"

exit 0
