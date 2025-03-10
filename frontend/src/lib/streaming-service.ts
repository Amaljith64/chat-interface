import { API_BASE_URL } from "./api-client";

export async function streamChatResponse(
    message: string, 
    conversationId: string | null, 
    onChunk: (chunk: string) => void,
    onComplete?: (fullResponse: string) => void,
    onConversationId?: (id: string) => void
  ) {
    try {
      async function makeRequest() {
        const response = await fetch(`${API_BASE_URL}/chat/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            conversation_id: conversationId,
          }),
          credentials: 'include',
        });
        
        return response;
      }
      
      // Make initial request
      let response = await makeRequest();
      
      // Handle token refresh if needed
      if (response.status === 401) {
        try {
          // Try to refresh the token
          const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include'
          });
          
          if (refreshResponse.ok) {
            // If refresh successful, retry original request
            response = await makeRequest();
          } else {
            // If refresh fails, redirect to login
            window.location.href = '/accounts/login';
            throw new Error('Authentication failed');
          }
        } catch (error) {
          console.error('Token refresh error:', error);
          window.location.href = '/accounts/login';
          throw new Error('Authentication failed');
        }
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      if (!response.body) {
        throw new Error('ReadableStream not supported');
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullResponse = '';
  
      const processStream = async (): Promise<void> => {
        const { done, value } = await reader.read();
        
        if (done) {
          if (onComplete) onComplete(fullResponse);
          return;
        }
      
        const chunk = decoder.decode(value, { stream: true });
        
        // Check if chunk contains data type
        if (chunk.includes('DATA_TYPE:CONVERSATION_ID')) {
          // Extract conversation ID if it's part of the chunk
          const matches = chunk.match(/DATA_TYPE:CONVERSATION_ID\n(.*?)\n/);
          if (matches && matches[1]) {
            const extractedConversationId = matches[1].trim();
            if (!conversationId && extractedConversationId) {
              if (onConversationId) {
                onConversationId(extractedConversationId);
              }
            }
          }
        }
      
        // Only pass content after the CONTENT
        if (chunk.includes('DATA_TYPE:CONTENT')) {
          const contentIndex = chunk.indexOf('DATA_TYPE:CONTENT') + 'DATA_TYPE:CONTENT\n'.length;
          const contentChunk = chunk.substring(contentIndex);
          
          fullResponse += contentChunk;
          onChunk(contentChunk);
        } else if (!chunk.includes('DATA_TYPE:')) {
          fullResponse += chunk;
          onChunk(chunk);
        }
        
        return processStream();
      };
  
      await processStream();
    } catch (error) {
      console.error('Error streaming chat response:', error);
      throw error;
    }
  }