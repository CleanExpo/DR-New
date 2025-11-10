# 🔐 Secret Rotation Script for Disaster Recovery Platform
# SECU-001 Resolution - Secure Secret Rotation

param(
    [switch]$GenerateSecrets,
    [switch]$UpdateLocal,
    [switch]$VerifyConfig,
    [switch]$Help
)

$ErrorActionPreference = "Stop"

function Show-Help {
    Write-Host "🔐 SECRET ROTATION SCRIPT" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\scripts\rotate-secrets.ps1 [options]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Green
    Write-Host "  -GenerateSecrets   Generate new secure secrets (NextAuth, JWT, etc.)"
    Write-Host "  -UpdateLocal       Create/update .env.local with new secrets"
    Write-Host "  -VerifyConfig      Verify current configuration"
    Write-Host "  -Help              Show this help message"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Green
    Write-Host "  .\scripts\rotate-secrets.ps1 -GenerateSecrets"
    Write-Host "  .\scripts\rotate-secrets.ps1 -UpdateLocal"
    Write-Host "  .\scripts\rotate-secrets.ps1 -VerifyConfig"
    Write-Host ""
    Write-Host "⚠️  IMPORTANT NOTES:" -ForegroundColor Red
    Write-Host "  1. NEVER commit .env.local or .env.production to Git"
    Write-Host "  2. After rotating, update Vercel environment variables"
    Write-Host "  3. Delete old credentials from Google Cloud Console"
    Write-Host "  4. Test thoroughly before revoking old credentials"
    Write-Host ""
}

function Generate-SecureSecret {
    param (
        [int]$Length = 32
    )

    try {
        $bytes = New-Object byte[] $Length
        $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
        $rng.GetBytes($bytes)
        return [Convert]::ToBase64String($bytes)
    }
    catch {
        Write-Host "⚠️  Error generating secret: $_" -ForegroundColor Red
        return $null
    }
}

function Generate-Secrets {
    Write-Host "🔐 GENERATING NEW SECURE SECRETS" -ForegroundColor Cyan
    Write-Host "=================================" -ForegroundColor Cyan
    Write-Host ""

    $secrets = @{}

    # Generate NextAuth Secret
    Write-Host "Generating NextAuth Secret..." -ForegroundColor Yellow
    $secrets.NEXTAUTH_SECRET = Generate-SecureSecret -Length 32

    # Generate JWT Secrets
    Write-Host "Generating JWT Secret..." -ForegroundColor Yellow
    $secrets.JWT_SECRET = Generate-SecureSecret -Length 32

    Write-Host "Generating JWT Refresh Secret..." -ForegroundColor Yellow
    $secrets.JWT_REFRESH_SECRET = Generate-SecureSecret -Length 32

    Write-Host ""
    Write-Host "✅ Generated Secrets:" -ForegroundColor Green
    Write-Host "=====================" -ForegroundColor Green
    Write-Host ""

    foreach ($key in $secrets.Keys) {
        $maskedValue = $secrets[$key].Substring(0, 8) + "..." + $secrets[$key].Substring($secrets[$key].Length - 8)
        Write-Host "$key = $maskedValue" -ForegroundColor White
    }

    Write-Host ""
    Write-Host "⚠️  SAVE THESE SECRETS SECURELY!" -ForegroundColor Red
    Write-Host ""
    Write-Host "📋 Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Copy these secrets to .env.local (use -UpdateLocal flag)"
    Write-Host "2. Add to Vercel Dashboard: Settings → Environment Variables"
    Write-Host "3. Redeploy your application"
    Write-Host ""

    return $secrets
}

function Update-LocalEnv {
    param (
        [hashtable]$Secrets
    )

    Write-Host "📝 UPDATING .env.local" -ForegroundColor Cyan
    Write-Host "======================" -ForegroundColor Cyan
    Write-Host ""

    $envLocalPath = ".env.local"
    $envExamplePath = ".env.example"

    # Check if .env.example exists
    if (-not (Test-Path $envExamplePath)) {
        Write-Host "❌ Error: .env.example not found!" -ForegroundColor Red
        return
    }

    # Read .env.example as template
    $templateContent = Get-Content $envExamplePath -Raw

    # Prompt for Google credentials
    Write-Host "⚠️  You need to provide NEW Google credentials:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Go to https://console.cloud.google.com/apis/credentials" -ForegroundColor Cyan
    Write-Host "2. Create NEW OAuth 2.0 credentials" -ForegroundColor Cyan
    Write-Host "3. Create NEW API Key" -ForegroundColor Cyan
    Write-Host ""

    Write-Host "Enter NEW Google Client ID (or press Enter to skip): " -ForegroundColor Yellow -NoNewline
    $googleClientId = Read-Host

    Write-Host "Enter NEW Google Client Secret (or press Enter to skip): " -ForegroundColor Yellow -NoNewline
    $googleClientSecret = Read-Host

    Write-Host "Enter NEW Google API Key (or press Enter to skip): " -ForegroundColor Yellow -NoNewline
    $googleApiKey = Read-Host

    Write-Host "Enter GMB Email (or press Enter to use default): " -ForegroundColor Yellow -NoNewline
    $gmbEmail = Read-Host
    if ([string]::IsNullOrWhiteSpace($gmbEmail)) {
        $gmbEmail = "disasterrecovery8@gmail.com"
    }

    # Create .env.local content
    $envContent = @"
# ========================================
# Disaster Recovery Platform
# Local Development Environment
# ========================================
# GENERATED: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
# ⚠️  NEVER COMMIT THIS FILE TO GIT!

# ========================================
# CORE APPLICATION
# ========================================
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$($Secrets.NEXTAUTH_SECRET)

# ========================================
# DATABASE
# ========================================
DATABASE_URL="file:./dev.db"

# ========================================
# AUTHENTICATION & SESSION
# ========================================
SESSION_COOKIE_NAME=dr-session
SESSION_COOKIE_MAX_AGE=86400
JWT_SECRET=$($Secrets.JWT_SECRET)
JWT_REFRESH_SECRET=$($Secrets.JWT_REFRESH_SECRET)

# ========================================
# GOOGLE CLOUD SERVICES
# ========================================
"@

    if (-not [string]::IsNullOrWhiteSpace($googleClientId)) {
        $envContent += "`nGOOGLE_CLIENT_ID=$googleClientId"
    }

    if (-not [string]::IsNullOrWhiteSpace($googleClientSecret)) {
        $envContent += "`nGOOGLE_CLIENT_SECRET=$googleClientSecret"
    }

    if (-not [string]::IsNullOrWhiteSpace($googleApiKey)) {
        $envContent += "`nGOOGLE_API_KEY=$googleApiKey"
        $envContent += "`nGOOGLE_MAPS_API_KEY=$googleApiKey"
    }

    $envContent += "`nGMB_EMAIL=$gmbEmail"

    # Write to .env.local
    $envContent | Out-File -FilePath $envLocalPath -Encoding UTF8

    Write-Host ""
    Write-Host "✅ Successfully created .env.local" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Review .env.local and add any additional required variables"
    Write-Host "2. Update Vercel environment variables with the same values"
    Write-Host "3. Test your application locally"
    Write-Host "4. Deploy to Vercel and verify production"
    Write-Host "5. DELETE old credentials from Google Cloud Console"
    Write-Host ""
}

function Verify-Configuration {
    Write-Host "🔍 VERIFYING CONFIGURATION" -ForegroundColor Cyan
    Write-Host "==========================" -ForegroundColor Cyan
    Write-Host ""

    $issues = @()

    # Check .env.local exists
    if (Test-Path ".env.local") {
        Write-Host "✅ .env.local exists" -ForegroundColor Green

        # Check for compromised secrets
        $envContent = Get-Content ".env.local" -Raw

        if ($envContent -match "944791662576") {
            $issues += "❌ CRITICAL: Old compromised Google Client ID found in .env.local"
        }

        if ($envContent -match "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") {
            $issues += "❌ CRITICAL: Old compromised Google Client Secret found in .env.local"
        }

        if ($envContent -match "AIzaSyAcTW4BvDdPnSLE7xoGMYBVEWjibPHoOiA") {
            $issues += "❌ CRITICAL: Old compromised Google API Key found in .env.local"
        }

        if ($envContent -match "LMUDdvl91SzvH84on2RBx820GPJX33z\+ICkk66EQMpg=") {
            $issues += "❌ CRITICAL: Old compromised NextAuth Secret found in .env.local"
        }

        # Check for empty/placeholder values
        if ($envContent -match "NEXTAUTH_SECRET=your-secret-key") {
            $issues += "⚠️  Warning: NEXTAUTH_SECRET appears to be a placeholder"
        }

        if ($envContent -match "GOOGLE_CLIENT_ID=$" -or $envContent -match "GOOGLE_CLIENT_ID=`n") {
            $issues += "⚠️  Warning: GOOGLE_CLIENT_ID is empty"
        }

    } else {
        $issues += "❌ .env.local does not exist - run with -UpdateLocal flag"
    }

    # Check .env.production is NOT tracked
    if (Test-Path ".env.production") {
        $gitStatus = git ls-files ".env.production" 2>&1
        if ($LASTEXITCODE -eq 0) {
            $issues += "❌ CRITICAL: .env.production is still tracked by Git!"
        } else {
            Write-Host "✅ .env.production is not tracked by Git" -ForegroundColor Green
        }
    }

    # Check .gitignore
    if (Test-Path ".gitignore") {
        $gitignoreContent = Get-Content ".gitignore" -Raw
        if ($gitignoreContent -match "\.env\.production") {
            Write-Host "✅ .gitignore includes .env.production" -ForegroundColor Green
        } else {
            $issues += "⚠️  Warning: .gitignore should explicitly include .env.production"
        }
    }

    Write-Host ""

    if ($issues.Count -eq 0) {
        Write-Host "✅ NO ISSUES FOUND - Configuration looks good!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  ISSUES FOUND:" -ForegroundColor Red
        Write-Host ""
        foreach ($issue in $issues) {
            Write-Host $issue -ForegroundColor Red
        }
    }

    Write-Host ""
}

# Main execution
if ($Help) {
    Show-Help
    exit 0
}

if ($GenerateSecrets) {
    $generatedSecrets = Generate-Secrets

    if ($UpdateLocal) {
        Update-LocalEnv -Secrets $generatedSecrets
    }
}
elseif ($UpdateLocal) {
    Write-Host "⚠️  No secrets generated. Run with -GenerateSecrets flag first." -ForegroundColor Yellow
    Write-Host "Or manually provide credentials when prompted." -ForegroundColor Yellow
    Write-Host ""

    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -eq "y") {
        $emptySecrets = @{
            NEXTAUTH_SECRET = (Generate-SecureSecret -Length 32)
            JWT_SECRET = (Generate-SecureSecret -Length 32)
            JWT_REFRESH_SECRET = (Generate-SecureSecret -Length 32)
        }
        Update-LocalEnv -Secrets $emptySecrets
    }
}
elseif ($VerifyConfig) {
    Verify-Configuration
}
else {
    Show-Help
}
