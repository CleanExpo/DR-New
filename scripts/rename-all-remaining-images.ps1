# Rename ALL Remaining Images with Spaces
# Phase 2: Handle all remaining files in public directory

$ErrorActionPreference = "Stop"
$baseDir = "D:\DR New"

$results = @{
    renamed = @()
    errors = @()
}

# Additional renames for remaining files
$additionalRenames = @{
    # Favicons directory
    "public\images\favicons\NRP Favicon.ico" = "public\images\favicons\nrp-favicon.ico"
    "public\images\favicons\NRP favicon_128x128.png" = "public\images\favicons\nrp-favicon-128x128.png"
    "public\images\favicons\NRP favicon_16x16.png" = "public\images\favicons\nrp-favicon-16x16.png"
    "public\images\favicons\NRP favicon_32x32.png" = "public\images\favicons\nrp-favicon-32x32.png"
    "public\images\favicons\NRP favicon_48x48.png" = "public\images\favicons\nrp-favicon-48x48.png"
    "public\images\favicons\NRP favicon_512x512.png" = "public\images\favicons\nrp-favicon-512x512.png"

    # Optimised/branding directory
    "public\images\optimised\branding\3D Disaster Recovery Logo.png" = "public\images\optimised\branding\3d-disaster-recovery-logo.png"
    "public\images\optimised\branding\Disaster Recovery Logo.png" = "public\images\optimised\branding\disaster-recovery-logo.png"

    # Optimised/damage directory
    "public\images\optimised\damage\3D Flood Damage.png" = "public\images\optimised\damage\3d-flood-damage.png"
    "public\images\optimised\damage\3D image of a house fire.png" = "public\images\optimised\damage\3d-image-of-a-house-fire.png"
    "public\images\optimised\damage\3D Mould Damage.png" = "public\images\optimised\damage\3d-mould-damage.png"
    "public\images\optimised\damage\3D Vehicle into Home.png" = "public\images\optimised\damage\3d-vehicle-into-home.png"
    "public\images\optimised\damage\3D Water Damage.png" = "public\images\optimised\damage\3d-water-damage.png"

    # Optimized/branding directory
    "public\images\optimized\branding\3D CARSI Logo.png" = "public\images\optimized\branding\3d-carsi-logo.png"
    "public\images\optimized\branding\3D Disaster Recovery Logo.png" = "public\images\optimized\branding\3d-disaster-recovery-logo.png"
    "public\images\optimized\branding\Disaster Recovery Logo.png" = "public\images\optimized\branding\disaster-recovery-logo.png"
    "public\images\optimized\branding\IICRC logo.png" = "public\images\optimized\branding\iicrc-logo.png"

    # Optimized/damage directory
    "public\images\optimized\damage\3D Air movement drying carpet.png" = "public\images\optimized\damage\3d-air-movement-drying-carpet.png"
    "public\images\optimized\damage\3D Burst Water Pipe.png" = "public\images\optimized\damage\3d-burst-water-pipe.png"
    "public\images\optimized\damage\3D Emergency Squalor Cleanup.png" = "public\images\optimized\damage\3d-emergency-squalor-cleanup.png"
    "public\images\optimized\damage\3D image of a house fire.png" = "public\images\optimized\damage\3d-image-of-a-house-fire.png"
    "public\images\optimized\damage\3D Kitchen Fire.png" = "public\images\optimized\damage\3d-kitchen-fire.png"
    "public\images\optimized\damage\3D Mould on Ceiling.png" = "public\images\optimized\damage\3d-mould-on-ceiling.png"
    "public\images\optimized\damage\3D Vehicle into Home.png" = "public\images\optimized\damage\3d-vehicle-into-home.png"
    "public\images\optimized\damage\3D Water Damage Mould on ceiling.png" = "public\images\optimized\damage\3d-water-damage-mould-on-ceiling.png"
    "public\images\optimized\damage\3D Water Damage to a Home.png" = "public\images\optimized\damage\3d-water-damage-to-a-home.png"
    "public\images\optimized\damage\Cat 1 - Water Damage Restoration.png" = "public\images\optimized\damage\cat-1-water-damage-restoration.png"
    "public\images\optimized\damage\Cat 3 Water Damage - Sewage Clean up.png" = "public\images\optimized\damage\cat-3-water-damage-sewage-clean-up.png"
    "public\images\optimized\damage\Graphic Crime Scene Cleaning Image.jpeg" = "public\images\optimized\damage\graphic-crime-scene-cleaning-image.jpeg"
    "public\images\optimized\damage\Mould Remediation - Black Mould.png" = "public\images\optimized\damage\mould-remediation-black-mould.png"
    "public\images\optimized\damage\Professional Carpet and Rug Cleaning.png" = "public\images\optimized\damage\professional-carpet-and-rug-cleaning.png"
    "public\images\optimized\damage\Timber Floor Drying.png" = "public\images\optimized\damage\timber-floor-drying.png"

    # Optimized/equipment directory
    "public\images\optimized\equipment\3D Air Mover.png" = "public\images\optimized\equipment\3d-air-mover.png"
    "public\images\optimized\equipment\3d Evolution DH Image.png" = "public\images\optimized\equipment\3d-evolution-dh-image.png"
    "public\images\optimized\equipment\3D Hepa Filters.png" = "public\images\optimized\equipment\3d-hepa-filters.png"
    "public\images\optimized\equipment\3D LGR Dehumidifier.png" = "public\images\optimized\equipment\3d-lgr-dehumidifier.png"
    "public\images\optimized\equipment\3D Low Profile Air Mover.png" = "public\images\optimized\equipment\3d-low-profile-air-mover.png"
    "public\images\optimized\equipment\3D Model Dehumidifier.png" = "public\images\optimized\equipment\3d-model-dehumidifier.png"
    "public\images\optimized\equipment\3D Moisture Meter Reading.png" = "public\images\optimized\equipment\3d-moisture-meter-reading.png"
    "public\images\optimized\equipment\3d Pheonix AFD flat view.png" = "public\images\optimized\equipment\3d-phoenix-afd-flat-view.png"
    "public\images\optimized\equipment\3D Professional Water Extractor.png" = "public\images\optimized\equipment\3d-professional-water-extractor.png"
    "public\images\optimized\equipment\3D Spotting Machine.png" = "public\images\optimized\equipment\3d-spotting-machine.png"
    "public\images\optimized\equipment\3D Thermal Fogging.png" = "public\images\optimized\equipment\3d-thermal-fogging.png"

    # Optimized/process directory
    "public\images\optimized\process\3D Emergency Squalor Cleanup.png" = "public\images\optimized\process\3d-emergency-squalor-cleanup.png"
    "public\images\optimized\process\3D Hazardous Cleaning.png" = "public\images\optimized\process\3d-hazardous-cleaning.png"

    # Optimized/thumbnails directory
    "public\images\optimized\thumbnails\3D Hazardous Cleaning.png" = "public\images\optimized\thumbnails\3d-hazardous-cleaning.png"
    "public\images\optimized\thumbnails\3D Mould Spores.png" = "public\images\optimized\thumbnails\3d-mould-spores.png"
    "public\images\optimized\thumbnails\NRP Logo Hands.png" = "public\images\optimized\thumbnails\nrp-logo-hands.png"
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "RENAME ALL REMAINING IMAGES" -ForegroundColor Cyan
Write-Host "Phase 2: Additional Directories" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Total files to rename: $($additionalRenames.Count)" -ForegroundColor Yellow
Write-Host ""

$counter = 0
foreach ($oldPath in $additionalRenames.Keys) {
    $counter++
    $newPath = $additionalRenames[$oldPath]
    $oldFullPath = Join-Path $baseDir $oldPath
    $newFullPath = Join-Path $baseDir $newPath

    $oldFileName = Split-Path $oldPath -Leaf
    $newFileName = Split-Path $newPath -Leaf

    Write-Host "[$counter/$($additionalRenames.Count)] " -NoNewline -ForegroundColor Gray

    if (Test-Path $oldFullPath) {
        try {
            if (Test-Path $newFullPath) {
                Write-Host "SKIP: " -NoNewline -ForegroundColor Yellow
                Write-Host "$oldFileName (target exists)" -ForegroundColor Yellow
                $results.errors += @{
                    file = $oldFileName
                    reason = "Target file already exists"
                }
            } else {
                Rename-Item -Path $oldFullPath -NewName $newFileName -Force
                Write-Host "OK: " -NoNewline -ForegroundColor Green
                Write-Host "$oldFileName -> $newFileName" -ForegroundColor White

                $results.renamed += @{
                    old = $oldFileName
                    new = $newFileName
                    path = Split-Path $oldPath -Parent
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

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "PHASE 2 SUMMARY" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Total files processed: $($additionalRenames.Count)" -ForegroundColor White
Write-Host "Successfully renamed: $($results.renamed.Count)" -ForegroundColor Green
Write-Host "Errors/Skipped: $($results.errors.Count)" -ForegroundColor $(if ($results.errors.Count -gt 0) { "Red" } else { "Green" })

# Export report
$reportFile = Join-Path $baseDir "scripts\image-rename-phase2-report.txt"
$report = @"
IMAGE FILE RENAMING REPORT - PHASE 2
Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

SUMMARY
=======
Total files processed: $($additionalRenames.Count)
Successfully renamed: $($results.renamed.Count)
Errors/Skipped: $($results.errors.Count)

SUCCESSFULLY RENAMED FILES
==========================
"@

foreach ($item in $results.renamed) {
    $report += "`n$($item.path)\$($item.old) -> $($item.new)"
}

if ($results.errors.Count -gt 0) {
    $report += "`n`nERRORS/SKIPPED FILES"
    $report += "`n===================="
    foreach ($error in $results.errors) {
        $report += "`n$($error.file): $($error.reason)"
    }
}

$report | Out-File $reportFile -Encoding UTF8
Write-Host "`nDetailed report saved: $reportFile" -ForegroundColor Cyan

Write-Host "`nDone!" -ForegroundColor Green
