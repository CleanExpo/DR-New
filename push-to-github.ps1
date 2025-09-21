# PowerShell script to push DR-New branch to GitHub

Write-Host "Pushing DR-New branch to GitHub..." -ForegroundColor Green

# Navigate to repository
Set-Location "D:\Disaster Recovery\Disaster-Recovery"

# Show current status
Write-Host "`nCurrent branch and commits:" -ForegroundColor Yellow
git branch
git log --oneline -3

# Push the branch
Write-Host "`nPushing to GitHub..." -ForegroundColor Green
$token = "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"
$url = "https://${token}@github.com/CleanExpo/DR-New.git"

git push $url DR-New

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Successfully pushed DR-New branch to GitHub!" -ForegroundColor Green
    Write-Host "Check: https://github.com/CleanExpo/DR-New/tree/DR-New" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Push failed. Please check your token and try again." -ForegroundColor Red
}

Write-Host "`nPress any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")