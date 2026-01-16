"""
FastAPI dependencies for authentication
"""

from typing import Callable
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .jwt_validator import validate_nextauth_token, NextAuthUser

# Security scheme for JWT tokens
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> NextAuthUser:
    """
    FastAPI dependency to get the current authenticated user

    Usage:
        @router.get("/protected")
        async def protected_route(user: NextAuthUser = Depends(get_current_user)):
            return {"user_id": user.id}
    """
    return validate_nextauth_token(credentials.credentials)


def require_role(*allowed_roles: str) -> Callable:
    """
    Factory for role-based access control

    Usage:
        @router.get("/admin-only")
        async def admin_route(user: NextAuthUser = Depends(require_role("ADMIN", "SUPER_ADMIN"))):
            return {"message": "Admin access granted"}
    """

    async def check_role(
        user: NextAuthUser = Depends(get_current_user),
    ) -> NextAuthUser:
        if user.user_type not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Role {user.user_type} not authorized for this operation",
            )
        return user

    return check_role


async def require_admin(
    user: NextAuthUser = Depends(get_current_user),
) -> NextAuthUser:
    """Require admin or super_admin role"""
    if user.user_type not in ("ADMIN", "SUPER_ADMIN"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return user


async def require_contractor(
    user: NextAuthUser = Depends(get_current_user),
) -> NextAuthUser:
    """Require contractor role"""
    if user.user_type != "CONTRACTOR":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Contractor access required",
        )
    return user
