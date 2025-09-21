@echo off
echo ===============================================
echo    DISASTER RECOVERY QLD - AUTOMATED DEPLOYMENT
echo ===============================================
echo.
echo This will automatically:
echo  1. Deploy all 125+ pages to your live site
echo  2. Submit sitemap to search engines
echo  3. Generate GMB content
echo  4. Set up SEO monitoring
echo.
echo ===============================================
pause

echo.
echo Starting automated deployment...
echo.

REM Run the automated deployment manager
node scripts/auto-manage-deployment.js

echo.
echo ===============================================
echo DEPLOYMENT COMPLETE!
echo ===============================================
echo.
echo CHECK THESE FILES FOR YOUR NEXT STEPS:
echo  - DEPLOYMENT_REPORT.md (Full report)
echo  - GMB_POSTS_READY.json (Content to post on GMB)
echo  - SEO_DASHBOARD.json (SEO tracking info)
echo.
echo Your website now has 125+ optimized pages!
echo.
pause