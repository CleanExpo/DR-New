#!/bin/bash

# Batch Migration Script - Service Sub-Page Icons
# Migrates all service sub-pages to use custom icons
# Usage: bash scripts/migrate-service-icons.sh

echo "🚀 Starting batch migration of service sub-pages..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counter
MIGRATED=0

# Function to migrate a single file
migrate_file() {
    local file=$1
    local service=$2
    local icon=$3
    local gradient=$4

    if [ ! -f "$file" ]; then
        echo "❌ File not found: $file"
        return 1
    fi

    # Check if already migrated (has @/icons import)
    if grep -q "@/icons" "$file"; then
        echo "⏭️  Already migrated: $(basename $file)"
        return 0
    fi

    # Add import for custom icon if not present
    if ! grep -q "import { $icon }" "$file"; then
        # Add import after other imports
        sed -i "0,/import.*from \"lucide-react\"/s/import.*from \"lucide-react\"/import { $icon } from \"@\/icons\"\n&/" "$file"
    fi

    # Replace CheckCircle with custom icon in the file
    sed -i "s/<CheckCircle className=\"h-8 w-8 text-\[#00BFA6\] mb-4\" \/>/  <$icon size=\"lg\" gradient=\"$gradient\" className=\"text-\[#00BFA6\] mb-4\" aria-hidden=\"true\" \/>/g" "$file"

    MIGRATED=$((MIGRATED + 1))
    echo "✅ Migrated: $(basename $file) → $icon"

    return 0
}

# Migrate Water Damage sub-pages
echo -e "${BLUE}Water Damage Pages:${NC}"
for file in D:/Disaster\ Recovery\ -\ NRP/app/services/water-damage/*/page.tsx; do
    migrate_file "$file" "water" "WaterDamage" "water"
done

# Migrate Fire & Smoke sub-pages
echo ""
echo -e "${BLUE}Fire & Smoke Pages:${NC}"
for file in D:/Disaster\ Recovery\ -\ NRP/app/services/fire-smoke-damage/*/page.tsx; do
    migrate_file "$file" "fire" "FireSmoke" "fire"
done

# Migrate Mould Remediation sub-pages
echo ""
echo -e "${BLUE}Mould Remediation Pages:${NC}"
for file in D:/Disaster\ Recovery\ -\ NRP/app/services/mould-remediation/*/page.tsx; do
    migrate_file "$file" "mould" "MouldRemediation" "mould"
done

# Migrate Biohazard Cleanup sub-pages
echo ""
echo -e "${BLUE}Biohazard Cleanup Pages:${NC}"
for file in D:/Disaster\ Recovery\ -\ NRP/app/services/biohazard-cleanup/*/page.tsx; do
    migrate_file "$file" "bio" "BioForensic" "bio"
done

echo ""
echo -e "${GREEN}✅ Migration complete!${NC}"
echo "📊 Total files migrated: $MIGRATED"
echo ""
echo "Next steps:"
echo "1. Run: npm run build"
echo "2. Verify build passes"
echo "3. Test in browser"
