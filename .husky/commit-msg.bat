@echo off
REM Commit message validation for Windows

REM Read commit message
set /p MSG=<.git/COMMIT_EDITMSG

REM Simple validation - ensure message is not empty and has minimum length
if "%MSG%"=="" (
  echo Error: Commit message cannot be empty
  exit /b 1
)

REM Check for conventional commit format (basic)
echo %MSG% | findstr /R "^(feat|fix|docs|style|refactor|perf|test|chore|build|ci)(\(.*\))?:" >nul
if errorlevel 1 (
  echo Warning: Consider using conventional commit format
  echo   Examples: feat: add new feature, fix: resolve bug
  echo   Types: feat, fix, docs, style, refactor, perf, test, chore, build, ci
  REM Just warning, don't fail
)

exit /b 0
