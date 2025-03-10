from fastapi import Depends, HTTPException, Cookie
from typing import Dict, Any, Optional
from core.clients import supabase



async def get_current_user(access_token: Optional[str] = Cookie(None)) -> Dict[str, Any]:

    try:
        token = None
        if access_token:
            # If cookie starts with "Bearer ", remove it
            if access_token.startswith("Bearer "):
                token = access_token.split(" ")[1]
            else:
                token = access_token

        user = supabase.auth.get_user(token)
        return user.user
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )