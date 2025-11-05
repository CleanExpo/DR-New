# Start Claude Orchestrator System

Write-Host ""
Write-Host "Starting Claude Orchestrator System" -ForegroundColor Cyan
Write-Host ""

# Check Docker
Write-Host "Checking Docker Desktop status..." -ForegroundColor Yellow
docker ps 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker Desktop is not running!" -ForegroundColor Red
    Write-Host "Please start Docker Desktop and wait 30 seconds, then try again." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host "Docker Desktop is running" -ForegroundColor Green
Write-Host ""

# Start orchestrator
Write-Host "Starting Claude Orchestrator containers..." -ForegroundColor Yellow
docker-compose -f docker-compose.claude.yml up -d

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Claude Orchestrator started successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Available services:" -ForegroundColor Cyan
    Write-Host "  Main Orchestrator:  http://localhost:3000"
    Write-Host "  API Endpoint:       http://localhost:3001"
    Write-Host "  Redis:              localhost:6379"
    Write-Host "  PostgreSQL:         localhost:5432"
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Cyan
    Write-Host "  claude              # Interactive mode"
    Write-Host "  claude generate 'Create landing page'  # Submit task"
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Failed to start orchestrator" -ForegroundColor Red
    Write-Host "Check logs with: docker-compose -f docker-compose.claude.yml logs" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}
