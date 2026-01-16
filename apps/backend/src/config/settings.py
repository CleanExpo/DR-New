"""
Pydantic Settings for Python Backend

Reads configuration from environment variables, matching the existing
.env configuration used by the Next.js application.
"""

from typing import List, Optional
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""

    model_config = SettingsConfigDict(
        env_file="../../.env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # Application
    DEBUG: bool = False
    APP_VERSION: str = "1.0.0"

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # Database - Note: asyncpg requires postgresql+asyncpg:// scheme
    DATABASE_URL: Optional[str] = None

    @property
    def ASYNC_DATABASE_URL(self) -> Optional[str]:
        """Convert DATABASE_URL to async compatible format"""
        if not self.DATABASE_URL:
            return None
        url = self.DATABASE_URL
        if url.startswith("postgresql://"):
            return url.replace("postgresql://", "postgresql+asyncpg://", 1)
        return url

    # Redis
    REDIS_URL: str = "redis://localhost:6379"

    # Authentication - MUST match Next.js NEXTAUTH_SECRET exactly
    NEXTAUTH_SECRET: str = ""

    # AI Providers
    AI_PROVIDER: str = "anthropic"
    ANTHROPIC_API_KEY: Optional[str] = None
    OPENAI_API_KEY: Optional[str] = None
    GOOGLE_GENERATIVE_AI_API_KEY: Optional[str] = None
    OLLAMA_BASE_URL: str = "http://localhost:11434"

    # Agent Configuration
    AGENT_DEFAULT_MODEL: str = "claude-sonnet-4-20250514"
    AGENT_MAX_ITERATIONS: int = 10
    AGENT_TIMEOUT_MS: int = 55000
    AGENT_ENABLE_STREAMING: bool = True

    # CORS - Parse from comma-separated string
    CORS_ORIGINS: str = "http://localhost:3000"

    @property
    def cors_origins_list(self) -> List[str]:
        """Get CORS origins as a list"""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()


# Singleton settings instance
settings = get_settings()
