@echo off
echo Killing all Node.js processes...
taskkill /F /IM node.exe 2>nul
echo.
echo Cleaning Next.js cache...
rmdir /s /q .next 2>nul
echo.
echo Starting DR-New development server...
echo Server will be available at http://localhost:3000
echo.
npm run dev