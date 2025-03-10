# routes/auth_routes.py
from fastapi import APIRouter, Request, HTTPException, Depends, Body, Response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from core.clients import supabase

router = APIRouter()

# Define request models
class UserAuth(BaseModel):
    email: str
    password: str

@router.post("/signup")
async def signup(user_data: UserAuth):
    try:
        auth_response = supabase.auth.sign_up({
            'email': user_data.email,
            'password': user_data.password
        })
        if auth_response.user is None:
            raise HTTPException(status_code=400, detail="Signup failed")
        return {"success": True, "message": "Signup successful", "userId": auth_response.user.id}
    except Exception as e:

        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login(user_data: UserAuth,response: Response):
    try:
        auth_response = supabase.auth.sign_in_with_password({
            'email': user_data.email,
            'password': user_data.password
        })
        if auth_response.user is None:
            raise HTTPException(status_code=400, detail="Login failed")
        
        access_token = auth_response.session.access_token
        refresh_token = auth_response.session.refresh_token
        content = {
            "success": True,
            "access_token": access_token,
            "user": {
                "id": auth_response.user.id,
                "email": auth_response.user.email
            }
        }
        response = JSONResponse(content=content)
        response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True)
        response.set_cookie(key="refresh_token", value=refresh_token, httponly=True)
        
        return response
    
    except Exception as e:
        print(e,'errsa')
        raise HTTPException(status_code=400, detail=str(e))

    

@router.post("/refresh")
async def refresh_token(response: Response, request: Request):
    try:
        # Get the refresh token from cookies
        cookies = request.cookies
        refresh_token = cookies.get("refresh_token")
        
        if not refresh_token:
            raise HTTPException(status_code=401, detail="No refresh token")
            
        # Refresh the session
        auth_response = supabase.auth.refresh_session(refresh_token)
        
        if auth_response.user is None:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
        
        # Set the new access token in cookie
        access_token = auth_response.session.access_token
        new_refresh_token = auth_response.session.refresh_token
        
        content = {
            "success": True,
            "access_token": access_token
        }
        
        response = JSONResponse(content=content)
        response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True)
        response.set_cookie(key="refresh_token", value=new_refresh_token, httponly=True)
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))