# Disaster Recovery - Python Backend

Python FastAPI backend for AI agent orchestration using LangGraph.

## Features

- **NextAuth JWT Validation**: Validates JWT tokens issued by the Next.js frontend
- **Agent Orchestration**: LangGraph-based workflow execution
- **Health Checks**: Ready for Kubernetes/container deployment
- **Structured Logging**: JSON logging with structlog

## Quick Start

### Prerequisites

- Python 3.11+
- PostgreSQL (shared with Next.js app)
- Redis (optional, for caching)

### Installation

```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # or `.venv\Scripts\activate` on Windows

# Install dependencies
pip install -e ".[dev]"

# Run the server
uvicorn src.api.main:app --reload --port 8000
```

### Environment Variables

The backend reads from the root `.env` file. Key variables:

```env
# Must match Next.js NEXTAUTH_SECRET exactly
NEXTAUTH_SECRET=your-secret

# Database (same as Next.js)
DATABASE_URL=postgresql://...

# AI Providers
ANTHROPIC_API_KEY=your-key
OPENAI_API_KEY=your-key

# CORS Origins
CORS_ORIGINS=http://localhost:3000,https://your-app.vercel.app
```

## API Endpoints

### Health

- `GET /api/v1/health` - Basic health check
- `GET /api/v1/health/ready` - Readiness check
- `GET /api/v1/health/live` - Liveness check

### Agents

- `POST /api/v1/agents/orchestrate` - Execute a workflow
- `GET /api/v1/agents/status/{job_id}` - Get job status
- `POST /api/v1/agents/cancel/{job_id}` - Cancel a job
- `GET /api/v1/agents/active` - Get active jobs

## Development

```bash
# Run tests
pytest

# Type checking
mypy src

# Linting
ruff check src

# Formatting
black src
```

## Docker

```bash
# Build
docker build -t disaster-recovery-backend .

# Run
docker run -p 8000:8000 --env-file ../../.env disaster-recovery-backend
```
