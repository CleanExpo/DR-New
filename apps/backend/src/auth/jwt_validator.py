"""
NextAuth JWT Token Validator for FastAPI

NextAuth.js uses a specific JWT structure:
- Signed with NEXTAUTH_SECRET using HS256
- Contains: sub, name, email, picture, iat, exp, jti
- Custom fields: id, role, userType (added in callbacks)
"""

from datetime import datetime, timezone
from typing import Optional
import jwt
from pydantic import BaseModel
from fastapi import HTTPException, status

from ..config import settings


class NextAuthUser(BaseModel):
    """User data extracted from NextAuth JWT token"""

    id: str
    email: str
    name: Optional[str] = None
    user_type: str = "CLIENT"
    image: Optional[str] = None
    tenant_id: Optional[str] = None


class NextAuthJWTValidator:
    """
    Validates NextAuth.js JWT tokens.

    NextAuth JWT structure (from lib/auth/index.ts callbacks):
    {
        "id": "user-cuid",
        "sub": "user-cuid",
        "email": "user@example.com",
        "name": "User Name",
        "role": "CLIENT" | "CONTRACTOR" | "ADMIN" | "SUPER_ADMIN",
        "userType": "CLIENT" | "CONTRACTOR" | "ADMIN" | "SUPER_ADMIN",
        "picture": "https://...",
        "tenantId": "tenant-cuid",
        "iat": 1234567890,
        "exp": 1234567890,
        "jti": "unique-token-id"
    }
    """

    def __init__(self, secret: str, algorithm: str = "HS256"):
        self.secret = secret
        self.algorithm = algorithm

    def validate_token(self, token: str) -> NextAuthUser:
        """
        Validate and decode a NextAuth JWT token

        Args:
            token: The JWT token string (without 'Bearer ' prefix)

        Returns:
            NextAuthUser with user information

        Raises:
            HTTPException: If token is invalid or expired
        """
        try:
            # Decode and validate the token
            payload = jwt.decode(
                token,
                self.secret,
                algorithms=[self.algorithm],
                options={"require": ["exp", "iat"]},
            )

            # Check expiration (jwt library does this, but double-check)
            if payload.get("exp"):
                exp_datetime = datetime.fromtimestamp(payload["exp"], tz=timezone.utc)
                if datetime.now(timezone.utc) > exp_datetime:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Token has expired",
                    )

            # Extract user ID from token
            # NextAuth stores user ID in both 'id' and 'sub' fields
            user_id = payload.get("id") or payload.get("sub")
            if not user_id:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token: missing user ID",
                )

            return NextAuthUser(
                id=user_id,
                email=payload.get("email", ""),
                name=payload.get("name"),
                user_type=payload.get("userType") or payload.get("role", "CLIENT"),
                image=payload.get("picture") or payload.get("image"),
                tenant_id=payload.get("tenantId"),
            )

        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired",
            )
        except jwt.InvalidTokenError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid token: {str(e)}",
            )


def validate_nextauth_token(token: str) -> NextAuthUser:
    """
    Validate a NextAuth JWT token using the configured secret

    Args:
        token: The JWT token string (without 'Bearer ' prefix)

    Returns:
        NextAuthUser with user information
    """
    validator = NextAuthJWTValidator(settings.NEXTAUTH_SECRET)
    return validator.validate_token(token)
