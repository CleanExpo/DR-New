@echo off
echo Fixing color contrast issues for WCAG compliance...

:: Fix color contrast in all TSX files
powershell -Command "(Get-Content 'app\page.tsx') -replace 'text-gray-600', 'text-gray-700' | Set-Content 'app\page.tsx'"
powershell -Command "(Get-Content 'app\about\page.tsx') -replace 'text-gray-600', 'text-gray-700' | Set-Content 'app\about\page.tsx'"
powershell -Command "(Get-Content 'app\contact\page.tsx') -replace 'text-gray-600', 'text-gray-700' | Set-Content 'app\contact\page.tsx'"
powershell -Command "(Get-Content 'app\services\page.tsx') -replace 'text-gray-600', 'text-gray-700' | Set-Content 'app\services\page.tsx'"
powershell -Command "(Get-Content 'app\faq\page.tsx') -replace 'text-gray-600', 'text-gray-700' | Set-Content 'app\faq\page.tsx'"
powershell -Command "(Get-Content 'app\pricing\page.tsx') -replace 'text-gray-600', 'text-gray-700' | Set-Content 'app\pricing\page.tsx'"
powershell -Command "(Get-Content 'app\privacy-policy\page.tsx') -replace 'text-gray-600', 'text-gray-700' | Set-Content 'app\privacy-policy\page.tsx'"
powershell -Command "(Get-Content 'app\terms-of-service\page.tsx') -replace 'text-gray-600', 'text-gray-700' | Set-Content 'app\terms-of-service\page.tsx'"
powershell -Command "(Get-Content 'components\sections\TrustIndicators.tsx') -replace 'text-gray-600', 'text-gray-700' | Set-Content 'components\sections\TrustIndicators.tsx'"
powershell -Command "(Get-Content 'components\sections\EmergencyTracker.tsx') -replace 'text-gray-600', 'text-gray-700' | Set-Content 'components\sections\EmergencyTracker.tsx'"
powershell -Command "(Get-Content 'components\sections\TestimonialsCarousel.tsx') -replace 'text-gray-600', 'text-gray-700' | Set-Content 'components\sections\TestimonialsCarousel.tsx'"

echo Color contrast fixes complete!