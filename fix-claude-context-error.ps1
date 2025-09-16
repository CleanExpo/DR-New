# Claude Context Window Fix Script
# Fixes the "Input is too long for requested model" error

param(
    [string]$Action = "help",
    [string]$ModelProvider = "anthropic"
)

Write-Host "=== Claude Context Window Fix Utility ===" -ForegroundColor Green
Write-Host "Current Time: $(Get-Date)" -ForegroundColor Gray

$ClaudeConfigPath = "$env:APPDATA\Claude\claude_desktop_config.json"
$BackupPath = "$env:APPDATA\Claude\claude_desktop_config.backup.json"

function Show-Help {
    Write-Host "`nUsage:" -ForegroundColor Yellow
    Write-Host "  fix-claude-context-error.ps1 -Action backup" -ForegroundColor White
    Write-Host "  fix-claude-context-error.ps1 -Action fix -ModelProvider anthropic" -ForegroundColor White
    Write-Host "  fix-claude-context-error.ps1 -Action fix -ModelProvider openrouter" -ForegroundColor White
    Write-Host "  fix-claude-context-error.ps1 -Action test" -ForegroundColor White
    Write-Host "  fix-claude-context-error.ps1 -Action restore" -ForegroundColor White
    
    Write-Host "`nActions:" -ForegroundColor Yellow
    Write-Host "  backup    - Backup current Claude configuration" -ForegroundColor White
    Write-Host "  fix       - Apply the context window fix" -ForegroundColor White
    Write-Host "  test      - Test current configuration" -ForegroundColor White
    Write-Host "  restore   - Restore from backup" -ForegroundColor White
    Write-Host "  help      - Show this help message" -ForegroundColor White
}

function Backup-Configuration {
    Write-Host "`n🔄 Backing up Claude configuration..." -ForegroundColor Blue
    
    if (Test-Path $ClaudeConfigPath) {
        Copy-Item $ClaudeConfigPath $BackupPath -Force
        Write-Host "✅ Backup created: $BackupPath" -ForegroundColor Green
    } else {
        Write-Host "❌ Claude config not found at: $ClaudeConfigPath" -ForegroundColor Red
        Write-Host "Please ensure Claude Desktop is installed." -ForegroundColor Yellow
        return $false
    }
    return $true
}

function Apply-Fix {
    param([string]$Provider)
    
    Write-Host "`n🔧 Applying context window fix for $Provider..." -ForegroundColor Blue
    
    # Read the template
    $templatePath = ".\claude-config-template.json"
    if (!(Test-Path $templatePath)) {
        Write-Host "❌ Template file not found: $templatePath" -ForegroundColor Red
        return $false
    }
    
    $template = Get-Content $templatePath | ConvertFrom-Json
    
    # Create new configuration
    $newConfig = @{
        mcpServers = $template.mcpServers
    }
    
    if ($Provider -eq "anthropic") {
        Write-Host "📝 Configuring for direct Anthropic API..." -ForegroundColor Yellow
        Write-Host "⚠️  You'll need to add your Anthropic API key manually" -ForegroundColor Yellow
        Write-Host "    Get it from: https://console.anthropic.com" -ForegroundColor Gray
        
        $newConfig.anthropic = @{
            apiKey = "YOUR_ANTHROPIC_API_KEY_HERE"
            model = "claude-3-5-sonnet-20241022"
        }
    } elseif ($Provider -eq "openrouter") {
        Write-Host "📝 Configuring for OpenRouter..." -ForegroundColor Yellow
        Write-Host "⚠️  You'll need to add your OpenRouter API key manually" -ForegroundColor Yellow
        Write-Host "    Get it from: https://openrouter.ai" -ForegroundColor Gray
        
        $newConfig.openrouter = @{
            apiKey = "YOUR_OPENROUTER_API_KEY_HERE"
            model = "anthropic/claude-3.5-sonnet"
            apiUrl = "https://openrouter.ai/api/v1/chat/completions"
        }
    }
    
    # Save new configuration
    $newConfig | ConvertTo-Json -Depth 10 | Set-Content $ClaudeConfigPath -Encoding UTF8
    
    Write-Host "✅ Configuration updated successfully!" -ForegroundColor Green
    Write-Host "📋 Next steps:" -ForegroundColor Yellow
    Write-Host "   1. Add your API key to: $ClaudeConfigPath" -ForegroundColor White
    Write-Host "   2. Restart Claude Desktop" -ForegroundColor White
    Write-Host "   3. Run: fix-claude-context-error.ps1 -Action test" -ForegroundColor White
    
    return $true
}

function Test-Configuration {
    Write-Host "`n🧪 Testing Claude configuration..." -ForegroundColor Blue
    
    if (!(Test-Path $ClaudeConfigPath)) {
        Write-Host "❌ Claude config not found" -ForegroundColor Red
        return $false
    }
    
    try {
        $config = Get-Content $ClaudeConfigPath | ConvertFrom-Json
        Write-Host "✅ Configuration file is valid JSON" -ForegroundColor Green
        
        # Check for API configuration
        if ($config.anthropic) {
            Write-Host "🔑 Anthropic API configured" -ForegroundColor Green
            Write-Host "   Model: $($config.anthropic.model)" -ForegroundColor Gray
        } elseif ($config.openrouter) {
            Write-Host "🔑 OpenRouter API configured" -ForegroundColor Green
            Write-Host "   Model: $($config.openrouter.model)" -ForegroundColor Gray
        } else {
            Write-Host "⚠️  No API provider configured" -ForegroundColor Yellow
        }
        
        # Check MCP servers
        if ($config.mcpServers) {
            $mcpCount = ($config.mcpServers | Get-Member -MemberType NoteProperty).Count
            Write-Host "🔌 MCP Servers configured: $mcpCount" -ForegroundColor Green
            
            foreach ($server in $config.mcpServers.PSObject.Properties) {
                Write-Host "   - $($server.Name)" -ForegroundColor Gray
            }
        }
        
        Write-Host "`n✅ Configuration looks good!" -ForegroundColor Green
        Write-Host "💡 If you still get errors, restart Claude Desktop" -ForegroundColor Blue
        
    } catch {
        Write-Host "❌ Configuration file has JSON errors" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
    
    return $true
}

function Restore-Configuration {
    Write-Host "`n🔄 Restoring Claude configuration from backup..." -ForegroundColor Blue
    
    if (Test-Path $BackupPath) {
        Copy-Item $BackupPath $ClaudeConfigPath -Force
        Write-Host "✅ Configuration restored from backup" -ForegroundColor Green
        Write-Host "🔄 Please restart Claude Desktop" -ForegroundColor Yellow
    } else {
        Write-Host "❌ No backup found at: $BackupPath" -ForegroundColor Red
        return $false
    }
    return $true
}

# Main script logic
switch ($Action.ToLower()) {
    "backup" { 
        Backup-Configuration
    }
    "fix" { 
        if (Backup-Configuration) {
            Apply-Fix -Provider $ModelProvider
        }
    }
    "test" { 
        Test-Configuration
    }
    "restore" { 
        Restore-Configuration
    }
    "help" { 
        Show-Help
    }
    default { 
        Write-Host "❌ Unknown action: $Action" -ForegroundColor Red
        Show-Help
    }
}

Write-Host "`n=== Script completed ===" -ForegroundColor Green
