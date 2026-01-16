"""
Health check endpoints
"""

from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

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


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Basic health check"""
    return HealthResponse(
        status="healthy",
        service="disaster-recovery-backend",
        version="1.0.0",
        timestamp=datetime.utcnow().isoformat(),
    )


@router.get("/health/ready", response_model=ReadinessResponse)
async def readiness_check() -> ReadinessResponse:
    """
    Readiness check for Kubernetes/container orchestration

    Returns the status of critical dependencies.
    """
    # TODO: Add actual database and Redis connectivity checks
    return ReadinessResponse(
        status="ready",
        database="not_checked",
        redis="not_checked",
    )


@router.get("/health/live")
async def liveness_check() -> dict:
    """Liveness check - minimal check that the service is responding"""
    return {"status": "alive"}
