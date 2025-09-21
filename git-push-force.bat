@echo off
echo Starting Git push to GitHub...
echo.

REM Set Git credentials
git config --global credential.helper wincred

REM Add the token to Windows Credential Manager manually if needed
echo If prompted for credentials:
echo Username: CleanExpo
echo Password: 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
echo.

REM Attempt the push
echo Pushing to GitHub...
git push https://CleanExpo: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@github.com/CleanExpo/DR-New.git DR-New:main --force

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