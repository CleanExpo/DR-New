@echo off
setlocal enabledelayedexpansion

echo.
echo ========================================
echo   DISASTER RECOVERY - PUSH CHANGES
echo ========================================
echo.

REM Check if we're in a git repository
git status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Not in a git repository or git not found
    pause
    exit /b 1
)

REM Show current branch and status
echo 📍 Current branch:
git branch --show-current
echo.

echo 📊 Current status:
git status --short
echo.

REM Check if there are uncommitted changes
git diff-index --quiet HEAD -- 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  You have uncommitted changes.
    echo.
    set /p "commit_choice=Would you like to commit them first? (y/N): "
    if /i "!commit_choice!"=="y" (
        echo.
        set /p "commit_msg=Enter commit message: "
        if "!commit_msg!"=="" (
            set "commit_msg=chore: Update files via push-changes script"
        )
        
        echo 📝 Adding all changes...
        git add .
        
        echo 💾 Committing with message: !commit_msg!
        git commit -m "!commit_msg!"
        
        if !ERRORLEVEL! NEQ 0 (
            echo ❌ Commit failed
            pause
            exit /b 1
        )
    ) else (
        echo ℹ️  Pushing without committing local changes...
    )
)

REM Show what we're about to push
echo.
echo 🚀 Preparing to push to origin/DR-New...
echo.
echo 📋 Recent commits:
git log --oneline -3
echo.

REM Confirm push
set /p "push_confirm=Continue with push? (Y/n): "
if /i "!push_confirm!"=="n" (
    echo ❌ Push cancelled by user
    pause
    exit /b 0
)

echo.
echo 🔄 Pushing to GitHub...
echo.

REM Try the push
git push origin DR-New

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   ✅ SUCCESS! Changes pushed to GitHub
    echo ========================================
    echo.
    echo 🌐 Branch: DR-New
    echo 🔗 View at: https://github.com/CleanExpo/DR-New/tree/DR-New
    echo.
    echo 🚀 Vercel should automatically deploy these changes.
    echo 📱 Check deployment at: https://dr-new.vercel.app
    echo.
) else (
    echo.
    echo ========================================
    echo   ❌ PUSH FAILED - Trying alternatives
    echo ========================================
    echo.
    echo 🔄 Attempting with upstream...
    git push --set-upstream origin DR-New
    
    if !ERRORLEVEL! EQU 0 (
        echo ✅ Push successful with upstream set!
    ) else (
        echo.
        echo 💡 Manual alternatives:
        echo   1. git push origin DR-New
        echo   2. git push --set-upstream origin DR-New
        echo   3. git push origin DR-New --force-with-lease
        echo.
        echo 🔍 Check if:
        echo   - You have internet connection
        echo   - GitHub token is valid
        echo   - Repository exists and you have access
        echo.
    )
)

echo.
echo Press any key to continue...
pause >nul
