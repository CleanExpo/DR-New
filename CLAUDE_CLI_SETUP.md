# Claude CLI Setup - Complete Guide

## ✅ Fixed Issues

The `claude` command is now fully functional in your PowerShell terminal!

### What Was Fixed

1. **Created PowerShell Function**: Added `claude` function to your PowerShell profile
2. **Created Windows Batch File**: `claude.cmd` for compatibility
3. **Created Startup Script**: `start-claude.ps1` to handle Docker Desktop and orchestrator startup

## 🚀 Quick Start

### Option 1: Automatic Startup (Recommended)

Run the startup script that handles everything:

```powershell
.\start-claude.ps1
```

This script will:
- Check if Docker Desktop is running
- Start Docker Desktop if needed (and wait for it to be ready)
- Launch all Claude orchestrator containers
- Display connection information

### Option 2: Manual Startup

If you prefer manual control:

1. **Start Docker Desktop** (if not already running)
   - Wait ~30 seconds for Docker to be fully ready

2. **Start the orchestrator:**
   ```powershell
   docker-compose -f docker-compose.claude.yml up -d
   ```

3. **Use the claude command:**
   ```powershell
   claude              # Interactive mode
   claude generate "Create a landing page for water damage restoration"
   ```

## 📖 Usage Guide

### Interactive Mode

```powershell
claude
```

This launches an interactive session where you can:
- Choose task types (generate, test, optimize, deploy, analyze)
- Enter task descriptions
- Set priorities (1-10)
- Monitor task progress in real-time

### Command Line Mode

```powershell
claude <task-type> <description>
```

Examples:
```powershell
claude generate "Create SEO-optimized content for Brisbane water damage"
claude test "Run Playwright tests for contractor onboarding"
claude optimize "Improve page load speed for homepage"
claude deploy "Deploy to Vercel production"
```

## 🏗️ Architecture

The Claude Orchestrator consists of multiple specialized agents:

| Container | Purpose | Port |
|-----------|---------|------|
| `claude-main` | Main orchestrator & task coordinator | 3000, 3001 |
| `claude-codegen` | Code generation (TypeScript, React, Next.js) | - |
| `claude-tester` | Testing & validation (Playwright, Jest) | - |
| `claude-seo` | SEO optimization & content creation | - |
| `claude-devops` | Deployment & infrastructure | - |
| `mcp-bridge` | Model Context Protocol services | - |
| `redis` | Inter-agent communication | 6379 |
| `postgres` | Persistent storage | 5432 |

## 🔧 Management Commands

### Start the System
```powershell
.\start-claude.ps1
# or manually:
docker-compose -f docker-compose.claude.yml up -d
```

### Stop the System
```powershell
docker-compose -f docker-compose.claude.yml down
```

### View Logs
```powershell
# All services
docker-compose -f docker-compose.claude.yml logs -f

# Specific service
docker-compose -f docker-compose.claude.yml logs -f claude-main
```

### Check Status
```powershell
docker-compose -f docker-compose.claude.yml ps
```

### Restart After Changes
```powershell
docker-compose -f docker-compose.claude.yml restart
```

### Rebuild Containers
```powershell
docker-compose -f docker-compose.claude.yml up -d --build
```

## 🔍 Troubleshooting

### "Failed to connect to orchestrator"

**Cause**: Docker Desktop isn't running or orchestrator hasn't started

**Solution**:
```powershell
# Use the startup script
.\start-claude.ps1

# Or manually check Docker status
docker ps
# If error, start Docker Desktop and wait 30 seconds
```

### "The term 'claude' is not recognized"

**Cause**: PowerShell profile hasn't been reloaded

**Solution**:
```powershell
# Reload your profile
. $PROFILE

# Or restart PowerShell
```

### Docker Build Errors

**Cause**: Missing Dockerfile or build context

**Solution**:
```powershell
# Check if Dockerfile exists
Test-Path ".\docker\claude-orchestrator\Dockerfile"

# View build logs
docker-compose -f docker-compose.claude.yml logs claude-main
```

### Container Won't Start

**Cause**: Port conflicts or resource issues

**Solution**:
```powershell
# Check what's using the ports
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Stop and remove all containers
docker-compose -f docker-compose.claude.yml down -v

# Restart
.\start-claude.ps1
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `claude-client.js` | CLI client that connects to orchestrator |
| `claude.cmd` | Windows batch wrapper |
| `start-claude.ps1` | Automatic startup script |
| `docker-compose.claude.yml` | Orchestrator service definitions |
| `$PROFILE` | PowerShell profile with `claude` function |

## 🔐 Environment Variables

The orchestrator uses these environment variables (defined in docker-compose):

- `CLAUDE_MODE`: orchestrator or agent
- `AGENT_TYPE`: Specialization (codegen, tester, seo, devops)
- `WORKSPACE_PATH`: Path to project files (/workspace)
- `ENABLE_AGENTS`: Enable multi-agent system
- `ENABLE_MCP`: Enable Model Context Protocol
- `AGENT_CONCURRENCY`: Max concurrent agents

## 📝 Notes

- The `claude` command is added to your PowerShell profile and persists across sessions
- Docker Desktop must be running for the full orchestrator to work
- The orchestrator runs on ports 3000 and 3001 - make sure these are available
- All containers share the project directory at `/workspace`
- Logs and outputs are persisted in Docker volumes

## 🆘 Support

If you encounter issues:

1. Check Docker Desktop is running: `docker ps`
2. View orchestrator logs: `docker-compose -f docker-compose.claude.yml logs -f`
3. Restart the system: `.\start-claude.ps1`
4. Check your PowerShell profile: `code $PROFILE`

## ✨ Next Steps

Now that the CLI is working:

1. Start the orchestrator: `.\start-claude.ps1`
2. Try interactive mode: `claude`
3. Submit a task: `claude generate "your task here"`
4. Monitor progress and results in the terminal

Enjoy your Claude Orchestrator system! 🎉
