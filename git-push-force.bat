@echo off
echo Starting Git push to GitHub...
echo.

REM Set Git credentials
git config --global credential.helper wincred

REM Use git credential helper for secure authentication
echo If prompted for credentials, enter your GitHub username and personal access token
echo.

REM Attempt the push
echo Pushing to GitHub...
git push origin DR-New --force

if %errorlevel% equ 0 (
    echo.
    echo SUCCESS! Code has been pushed to GitHub.
    echo Check: https://github.com/CleanExpo/DR-New
) else (
    echo.
    echo FAILED! Please try the following:
    echo 1. Check if the repository exists at https://github.com/CleanExpo/DR-New
    echo 2. Verify the token is still valid
    echo 3. Check your internet connection
    echo.
    echo Alternative: Try creating the repository first:
    echo   - Go to https://github.com/new
    echo   - Create repository named "DR-New"
    echo   - Then run this script again
)

pause
