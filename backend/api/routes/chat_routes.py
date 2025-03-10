from fastapi import APIRouter, Depends
from pydantic import BaseModel,Field
from typing import List, Optional
from core.clients import supabase,gorq_client
from core.user_info import get_current_user
from fastapi.responses import StreamingResponse




router = APIRouter()


class ChatRequest(BaseModel):
    conversation_id:Optional[str] =None
    message:str


async def stream_chat_data(message, conversation_id):
    # Send conversation ID 
    yield f"DATA_TYPE:CONVERSATION_ID\n{conversation_id}\n"
    
    # Signal the start of actual content
    yield "DATA_TYPE:CONTENT\n"

    chat_completion = gorq_client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": message,
        }
    ],
    model="llama-3.3-70b-versatile",
    stream=True,
    )

    complete_response = ""

    for chunk in chat_completion:
        content = chunk.choices[0].delta.content
        if content is not None:
            complete_response += content
            yield content

    # After streaming is complete, save the assistant's response
    if complete_response:
        supabase.table("messages").insert({
            "conversation_id": conversation_id,
            "content": complete_response,
            "role": "assistant"
        }).execute()


@router.post('/send')
async def send_message(request:ChatRequest, current_user: dict = Depends(get_current_user) ):

    print(request.message,'the message')

    conversation_id = request.conversation_id

    if not conversation_id:
        conversation_result = supabase.table("conversations").insert({
            "user_id": current_user.id,
            "title": request.message[:30] + "..." if len(request.message) > 30 else request.message
        }).execute()

        conversation_id = conversation_result.data[0]['id']

    
    supabase.table("messages").insert({
        "conversation_id":conversation_id,
        "content": request.message,
        "role":"user"
    }).execute()





    response = StreamingResponse(stream_chat_data(request.message, conversation_id), media_type="text/plain")



    resp_data = {
        "conversation_id":conversation_id,
        "message":"chat_completion.choices[0].message.content"
    }

    return response


@router.get('/history/{conversation_id}')
async def get_conversation_history(conversation_id: str, current_user: dict = Depends(get_current_user)):
    """Get the full history of a conversation"""
    
    # Verify the conversation belongs to this user
    conversation = supabase.table("conversations").select("*").eq("id", conversation_id).eq("user_id", current_user.id).execute()
    
    if not conversation.data:
        return {"error": "Conversation not found"}
    
    # Get all messages for this conversation
    messages = supabase.table("messages").select("*").eq("conversation_id", conversation_id).order("created_at").execute()
    
    return {
        "conversation": conversation.data[0],
        "messages": messages.data
    }