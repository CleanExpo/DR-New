# Image File Renaming Script
# Renames 102 image files with spaces to use hyphens instead

$ErrorActionPreference = "Stop"
$baseDir = "D:\DR New"

# Track results
$results = @{
    renamed = @()
    errors = @()
    codeReferences = @()
}

# Define all renames: old_name => new_name
$renames = @{
    # Places directory (17 files)
    "public\images\places\3D Art Museums.png" = "public\images\places\3d-art-museums.png"
    "public\images\places\3D Care Facilities.png" = "public\images\places\3d-care-facilities.png"
    "public\images\places\3D Close Living Residential.png" = "public\images\places\3d-close-living-residential.png"
    "public\images\places\3D Commercial .png" = "public\images\places\3d-commercial.png"
    "public\images\places\3D Complex Claims.png" = "public\images\places\3d-complex-claims.png"
    "public\images\places\3D Facility Management.png" = "public\images\places\3d-facility-management.png"
    "public\images\places\3D Family Home.png" = "public\images\places\3d-family-home.png"
    "public\images\places\3d Government Buildings.png" = "public\images\places\3d-government-buildings.png"
    "public\images\places\3D Graffiti Removal After.png" = "public\images\places\3d-graffiti-removal-after.png"
    "public\images\places\3D Graffiti Remove Before.png" = "public\images\places\3d-graffiti-remove-before.png"
    "public\images\places\3D Mega Mall.png" = "public\images\places\3d-mega-mall.png"
    "public\images\places\3D Residential.png" = "public\images\places\3d-residential.png"
    "public\images\places\3D Schools.png" = "public\images\places\3d-schools.png"
    "public\images\places\3D Small Business .png" = "public\images\places\3d-small-business.png"
    "public\images\places\3D Small Business Industrial.png" = "public\images\places\3d-small-business-industrial.png"
    "public\images\places\3D Specialised Claims.png" = "public\images\places\3d-specialised-claims.png"
    "public\images\places\3d Univercity.png" = "public\images\places\3d-university.png"

    # Equipment directory (7 PNG files)
    "public\images\optimised\equipment\3D Dehumidifier.png" = "public\images\optimised\equipment\3d-dehumidifier.png"
    "public\images\optimised\equipment\3D Extraction Unit.png" = "public\images\optimised\equipment\3d-extraction-unit.png"
    "public\images\optimised\equipment\3D Industrial Fan.png" = "public\images\optimised\equipment\3d-industrial-fan.png"
    "public\images\optimised\equipment\3D Moisture Meter Reading.png" = "public\images\optimised\equipment\3d-moisture-meter-reading.png"
    "public\images\optimised\equipment\3D Moisture Meter.png" = "public\images\optimised\equipment\3d-moisture-meter.png"
    "public\images\optimised\equipment\3D Thermal Camera.png" = "public\images\optimised\equipment\3d-thermal-camera.png"
    "public\images\optimised\equipment\3D Thermal Fogging.png" = "public\images\optimised\equipment\3d-thermal-fogging.png"

    # Process directory (6 PNG files)
    "public\images\optimised\process\3D Assessment.png" = "public\images\optimised\process\3d-assessment.png"
    "public\images\optimised\process\3D Drying Process.png" = "public\images\optimised\process\3d-drying-process.png"
    "public\images\optimised\process\3D Emergency Squalor Cleanup.png" = "public\images\optimised\process\3d-emergency-squalor-cleanup.png"
    "public\images\optimised\process\3D Hazardous Cleaning.png" = "public\images\optimised\process\3d-hazardous-cleaning.png"
    "public\images\optimised\process\3D Remediation.png" = "public\images\optimised\process\3d-remediation.png"
    "public\images\optimised\process\3D Restoration.png" = "public\images\optimised\process\3d-restoration.png"

    # Team directory (1 file)
    "public\images\team\3D Shane.png" = "public\images\team\3d-shane.png"

    # Logos directory (5 files with spaces)
    "public\logos\3D CARSI Logo.png" = "public\logos\3d-carsi-logo.png"
    "public\logos\3D Clean Claims.png" = "public\logos\3d-clean-claims.png"
    "public\logos\3D Disaster Recovery Logo Image.png" = "public\logos\3d-disaster-recovery-logo-image.png"
    "public\logos\3D Disaster Recovery Round Borders.png" = "public\logos\3d-disaster-recovery-round-borders.png"
    "public\logos\3D NRP Logo.png" = "public\logos\3d-nrp-logo.png"
    "public\logos\NRP Favicon.ico" = "public\logos\nrp-favicon.ico"
    "public\logos\NRP favicon_128x128.png" = "public\logos\nrp-favicon-128x128.png"
    "public\logos\NRP favicon_16x16.png" = "public\logos\nrp-favicon-16x16.png"
    "public\logos\NRP favicon_32x32.png" = "public\logos\nrp-favicon-32x32.png"
    "public\logos\NRP favicon_48x48.png" = "public\logos\nrp-favicon-48x48.png"
    "public\logos\NRP favicon_512x512.png" = "public\logos\nrp-favicon-512x512.png"

    # Images/logos directory (6 files with spaces)
    "public\images\logos\3D CARSI Logo.png" = "public\images\logos\3d-carsi-logo.png"
    "public\images\logos\3D Clean Claims Logo.png" = "public\images\logos\3d-clean-claims-logo.png"
    "public\images\logos\3D Facebook.png" = "public\images\logos\3d-facebook.png"
    "public\images\logos\3D Instagram.png" = "public\images\logos\3d-instagram.png"
    "public\images\logos\3D LinkedIn.png" = "public\images\logos\3d-linkedin.png"
    "public\images\logos\3D YouTube.png" = "public\images\logos\3d-youtube.png"
    "public\images\logos\NRP Favicon.ico" = "public\images\logos\nrp-favicon.ico"
    "public\images\logos\nrp\NRP Favicon.ico" = "public\images\logos\nrp\nrp-favicon.ico"
    "public\images\logos\nrp\NRP favicon_128x128.png" = "public\images\logos\nrp\nrp-favicon-128x128.png"
    "public\images\logos\nrp\NRP favicon_16x16.png" = "public\images\logos\nrp\nrp-favicon-16x16.png"
    "public\images\logos\nrp\NRP favicon_32x32.png" = "public\images\logos\nrp\nrp-favicon-32x32.png"
    "public\images\logos\nrp\NRP favicon_48x48.png" = "public\images\logos\nrp\nrp-favicon-48x48.png"
    "public\images\logos\nrp\NRP favicon_512x512.png" = "public\images\logos\nrp\nrp-favicon-512x512.png"
}

# Files that have code references (need manual updates)
$filesWithCodeRefs = @(
    "public\images\team\3D Shane.png",
    "public\images\optimised\process\3D Assessment.png",
    "public\images\optimised\equipment\3D Dehumidifier.png",
    "public\images\optimised\process\3D Drying Process.png",
    "public\images\optimised\process\3D Remediation.png",
    "public\images\optimised\process\3D Restoration.png",
    "public\logos\3D CARSI Logo.png",
    "public\logos\3D NRP Logo.png"
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "IMAGE FILE RENAMING SCRIPT" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Total files to rename: $($renames.Count)" -ForegroundColor Yellow
Write-Host "Files with code references: $($filesWithCodeRefs.Count)`n" -ForegroundColor Yellow

# Perform renames
$counter = 0
foreach ($oldPath in $renames.Keys) {
    $counter++
    $newPath = $renames[$oldPath]
    $oldFullPath = Join-Path $baseDir $oldPath
    $newFullPath = Join-Path $baseDir $newPath

    $oldFileName = Split-Path $oldPath -Leaf
    $newFileName = Split-Path $newPath -Leaf

    Write-Host "[$counter/$($renames.Count)] " -NoNewline -ForegroundColor Gray

    if (Test-Path $oldFullPath) {
        try {
            # Check if target already exists
            if (Test-Path $newFullPath) {
                Write-Host "SKIP: " -NoNewline -ForegroundColor Yellow
                Write-Host "$oldFileName (target exists)" -ForegroundColor Yellow
                $results.errors += @{
                    file = $oldFileName
                    reason = "Target file already exists"
                }
            } else {
                # Perform rename
                Rename-Item -Path $oldFullPath -NewName $newFileName -Force
                Write-Host "OK: " -NoNewline -ForegroundColor Green
                Write-Host "$oldFileName -> $newFileName" -ForegroundColor White

                $result = @{
                    old = $oldFileName
                    new = $newFileName
                    path = Split-Path $oldPath -Parent
                    hasCodeRefs = $filesWithCodeRefs -contains $oldPath
                }
                $results.renamed += $result

                if ($result.hasCodeRefs) {
                    $results.codeReferences += $result
                }
            }
        } catch {
            Write-Host "ERROR: " -NoNewline -ForegroundColor Red
            Write-Host "$oldFileName - $($_.Exception.Message)" -ForegroundColor Red
            $results.errors += @{
                file = $oldFileName
                reason = $_.Exception.Message
            }
        }
    } else {
        Write-Host "MISSING: " -NoNewline -ForegroundColor Magenta
        Write-Host "$oldFileName (file not found)" -ForegroundColor Magenta
        $results.errors += @{
            file = $oldFileName
            reason = "File not found"
        }
    }
}

# Generate summary report
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "SUMMARY REPORT" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Total files processed: $($renames.Count)" -ForegroundColor White
Write-Host "Successfully renamed: $($results.renamed.Count)" -ForegroundColor Green
Write-Host "Errors/Skipped: $($results.errors.Count)" -ForegroundColor $(if ($results.errors.Count -gt 0) { "Red" } else { "Green" })
Write-Host "Files requiring code updates: $($results.codeReferences.Count)" -ForegroundColor Yellow

# Export mapping file
$mappingFile = Join-Path $baseDir "scripts\image-rename-mapping.json"
$mapping = @{}
foreach ($oldPath in $renames.Keys) {
    $oldFileName = Split-Path $oldPath -Leaf
    $newFileName = Split-Path $renames[$oldPath] -Leaf
    $mapping[$oldFileName] = $newFileName
}
$mapping | ConvertTo-Json -Depth 10 | Out-File $mappingFile -Encoding UTF8
Write-Host "`nMapping file saved: $mappingFile" -ForegroundColor Cyan

# Export detailed report
$reportFile = Join-Path $baseDir "scripts\image-rename-report.txt"
$report = @"
IMAGE FILE RENAMING REPORT
Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

SUMMARY
=======
Total files processed: $($renames.Count)
Successfully renamed: $($results.renamed.Count)
Errors/Skipped: $($results.errors.Count)
Files requiring code updates: $($results.codeReferences.Count)

SUCCESSFULLY RENAMED FILES
==========================
"@

foreach ($item in $results.renamed) {
    $report += "`n$($item.path)\$($item.old) -> $($item.new)"
    if ($item.hasCodeRefs) {
        $report += " [CODE REFS!]"
    }
}

if ($results.errors.Count -gt 0) {
    $report += "`n`nERRORS/SKIPPED FILES"
    $report += "`n===================="
    foreach ($error in $results.errors) {
        $report += "`n$($error.file): $($error.reason)"
    }
}

if ($results.codeReferences.Count -gt 0) {
    $report += "`n`nFILES REQUIRING CODE UPDATES"
    $report += "`n============================="
    $report += "`nThese files were renamed but have code references that need updating:"
    foreach ($item in $results.codeReferences) {
        $report += "`n- $($item.old) -> $($item.new)"
    }
}

$report | Out-File $reportFile -Encoding UTF8
Write-Host "Detailed report saved: $reportFile" -ForegroundColor Cyan

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if ($results.codeReferences.Count -gt 0) {
    Write-Host "WARNING: $($results.codeReferences.Count) renamed files have code references!" -ForegroundColor Yellow
    Write-Host "You must update the following file references in your codebase:" -ForegroundColor Yellow
    Write-Host ""
    foreach ($item in $results.codeReferences) {
        Write-Host "  $($item.old) -> $($item.new)" -ForegroundColor White
    }
    Write-Host ""
    Write-Host "Use the mapping file to perform global search/replace:" -ForegroundColor Cyan
    Write-Host "  $mappingFile" -ForegroundColor White
}

Write-Host "`nDone!" -ForegroundColor Green
