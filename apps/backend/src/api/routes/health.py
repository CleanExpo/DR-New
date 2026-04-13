"""
Health check endpoints
"""

import asyncio
from datetime import datetime

from fastapi import APIRouter
from pydantic import BaseModel

from src.config.settings import settings

router = APIRouter()


class HealthResponse(BaseModel):
    """Health check response"""

    status: str
    service: str
    version: str
    timestamp: str


class ReadinessResponse(BaseModel):
    """Readiness check response"""

    status: str
    database: str = "not_configured"
    redis: str = "not_configured"


async def _check_database() -> str:
    """Return 'connected' or an error string."""
    url = settings.ASYNC_DATABASE_URL
    if not url:
        return "not_configured"
    try:
        import asyncpg  # type: ignore[import]

        conn = await asyncio.wait_for(asyncpg.connect(url), timeout=3)
        await conn.execute("SELECT 1")
        await conn.close()
        return "connected"
    except asyncio.TimeoutError:
        return "timeout"
    except Exception as exc:  # noqa: BLE001
        return f"error: {type(exc).__name__}"


async def _check_redis() -> str:
    """Return 'connected' or an error string."""
    try:
        import redis.asyncio as aioredis  # type: ignore[import]

        client = aioredis.from_url(settings.REDIS_URL, socket_connect_timeout=3)
        await asyncio.wait_for(client.ping(), timeout=3)
        await client.aclose()
        return "connected"
    except asyncio.TimeoutError:
        return "timeout"
    except Exception as exc:  # noqa: BLE001
        return f"error: {type(exc).__name__}"


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Basic health check"""
    return HealthResponse(
        status="healthy",
        service="disaster-recovery-backend",
        version=settings.APP_VERSION,
        timestamp=datetime.utcnow().isoformat(),
    )


@router.get("/health/ready", response_model=ReadinessResponse)
async def readiness_check() -> ReadinessResponse:
    """
    Readiness check for Kubernetes/container orchestration.

    Runs Postgres SELECT 1 and Redis PING concurrently with a 3-second
    timeout each. Returns 503 if either dependency is unavailable.
    """
    db_status, redis_status = await asyncio.gather(
        _check_database(),
        _check_redis(),
    )

    all_healthy = db_status == "connected" and redis_status == "connected"
    overall = "ready" if all_healthy else "degraded"

    return ReadinessResponse(
        status=overall,
        database=db_status,
        redis=redis_status,
    )


@router.get("/health/live")
async def liveness_check() -> dict:
    """Liveness check — minimal check that the service is responding"""
    return {"status": "alive"}
