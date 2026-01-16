"""
FastAPI Application Factory

Main entry point for the Python backend.
Integrates with the existing Next.js frontend via NextAuth JWT validation.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import structlog

from .routes import agents, health
from ..config import settings

# Configure structured logging
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer(),
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    wrapper_class=structlog.stdlib.BoundLogger,
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    logger.info(
        "Starting FastAPI backend",
        version=settings.APP_VERSION,
        debug=settings.DEBUG,
    )

    # Startup: Initialize resources
    # TODO: Initialize database connection pool if needed
    # TODO: Initialize Redis connection if needed

    yield

    # Shutdown: Cleanup resources
    logger.info("Shutting down FastAPI backend")


def create_app() -> FastAPI:
    """Create and configure FastAPI application"""
    app = FastAPI(
        title="Disaster Recovery - Agent Orchestration API",
        description="Python FastAPI backend for LangGraph agent orchestration",
        version=settings.APP_VERSION,
        docs_url="/api/docs" if settings.DEBUG else None,
        redoc_url="/api/redoc" if settings.DEBUG else None,
        openapi_url="/api/openapi.json" if settings.DEBUG else None,
        lifespan=lifespan,
    )

    # CORS middleware - allow Next.js frontend
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register routes
    app.include_router(health.router, prefix="/api/v1", tags=["health"])
    app.include_router(agents.router, prefix="/api/v1/agents", tags=["agents"])

    @app.get("/")
    async def root():
        """Root endpoint"""
        return {
            "status": "ok",
            "service": "disaster-recovery-backend",
            "version": settings.APP_VERSION,
        }

    return app


# Create the app instance
app = create_app()
