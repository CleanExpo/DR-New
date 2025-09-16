@echo off
echo.
echo ========================================
echo    KILLING ALL NODE.JS PROCESSES
echo ========================================
echo.
taskkill /F /IM node.exe 2>nul
if %errorlevel% == 0 (
    echo [SUCCESS] All Node.js processes killed
) else (
    echo [INFO] No Node.js processes were running
)
echo.
echo ========================================
echo    CLEANING BUILD CACHE
echo ========================================
echo.
if exist .next (
    rmdir /s /q .next
    echo [SUCCESS] Cleaned .next folder
) else (
    echo [INFO] No .next folder to clean
)
echo.
echo ========================================
echo    STARTING DR-NEW WEBSITE
echo ========================================
echo.
echo Starting server on port 3000...
echo.
echo DR-NEW Website Features:
echo - Brisbane's Premier Disaster Recovery
echo - Direct service provider (NOT a platform)
echo - Phone: 1300 309 361
echo - Hero banners with disaster images
echo.
npm run dev