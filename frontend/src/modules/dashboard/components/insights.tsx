"use client";
import { Card, CardBody, CardTitle } from "@/modules/common/card";
import SuggestionCard from "./suggetion-card";
import { Maximize2, Minimize2 } from "lucide-react";

import { useState, useRef, useEffect } from "react";
import { streamChatResponse } from "@/lib/streaming-service";
import { useRouter, useSearchParams } from "next/navigation";
import { getChatHistory } from "@/services/api/data/data";
import Image from "next/image";

const suggetionCardData = [
  {
    icon: "/icons/icon _pencil_.svg",
    title: "what are my tasks due today",
  },
  {
    icon: "/icons/icon _person_.svg",
    title: "what's happening with xyz client",
  },
  {
    icon: "/icons/icon _Question_.svg",
    title: "who has been sick the most",
  },
];
interface insightsProps {
  open: boolean;
  handleOpen: () => void;
}

interface Message {
  role?: "user" | "assistant" | "system";
  content: string;
  conversation_id?: string;
}

const InsightsPanel = ({ open, handleOpen }: insightsProps) => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [responses, setResponses] = useState<Message[]>([]);
  const [currentResponse, setCurrentResponse] = useState<string>("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlConversationId = searchParams.get("conversation_id");
    if (urlConversationId) {
      setConversationId(urlConversationId);
      loadConversationHistory(urlConversationId);
    }
  }, [searchParams]);

  const loadConversationHistory = async (id: string) => {
    try {
      setLoading(true);
      const response = await getChatHistory(id);

      console.log(response,'response');

      setResponses(response.messages || []);
    } catch (error) {
      console.error("Failed to load conversation history:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (conversationId) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("conversation_id", conversationId);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [conversationId, router, searchParams]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;


    const userMessage = message.trim();
    setResponses((prev) => [...prev, { role: "user", content: userMessage }]);
    setMessage("");
    setLoading(true);
    setCurrentResponse("");

    try {
      await streamChatResponse(
        userMessage,
        conversationId,
        (chunk) => {
          setCurrentResponse((prev) => prev + chunk);
        },
        (fullResponse: string) => {
          setResponses((prev) => [
            ...prev,
            { role: "assistant", content: fullResponse },
          ]);
          setCurrentResponse("");

          try {

            const responseObj = JSON.parse(fullResponse);
            if (responseObj.conversation_id && !conversationId) {
              setConversationId(responseObj.conversation_id);
            }
          } catch (err) {
            console.log(err, "Response is not JSON, using as plain text");
          }
        },
        (newConversationId) => {

          setConversationId(newConversationId);
          const params = new URLSearchParams(searchParams.toString());
          params.set("conversation_id", newConversationId);
          router.replace(`?${params.toString()}`, { scroll: false });
        }
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setResponses((prev) => [
        ...prev,
        {
          role: "system",
          content: "Sorry, there was an error processing your request.",
        },
      ]);
    } finally {
      setLoading(false);
      // Scroll to the bottom
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <Card className={`w-full h-full p-4 md:p-8`}>
      <CardBody className="flex flex-col justify-between h-full">
        <CardTitle>
          <div className="flex justify-between">
            <div>
              Insights
              <span className="ml-1 text-base">✨</span>
            </div>
            <div className="cursor-pointer" onClick={handleOpen}>
              {!open ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </div>
          </div>
        </CardTitle>

        <div className="flex flex-col flex-1 overflow-auto justify-end my-4 gap-4">
          {responses.length === 0 ? (
            <div className="flex flex-col gap-3 mt-4  ">
              <p className="text-gray-500 text-sm">
                Ask anything about your team or projects!
              </p>
              <div className="flex gap-3">
                {suggetionCardData.map((data, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(data.title)}
                  >
                    <SuggestionCard icon={data.icon} text={data.title} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {Array.isArray(responses) && responses.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${
                    msg.role === "user"
                      ? "bg-gray-100 self-end"
                      : msg.role === "system"
                      ? "bg-red-100"
                      : "bg-green-50"
                  } p-3 rounded-lg max-w-[85%] ${
                    msg.role === "user" ? "ml-auto" : "mr-auto"
                  }`}
                >
                  {msg.content}
                </div>
              ))}

              {currentResponse && (
                <div className="bg-green-50 p-3 rounded-lg max-w-[85%] mr-auto">
                  {currentResponse}
                  <span className="animate-pulse">▌</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Ask me anything about the group conversations!"
              className="w-full h-[39px] border shadow-lg shadow-[#dfdfdf] backdrop-opacity-25 border-black rounded-[7px] px-4 py-2 shadow-button font-lexend font-light text-sm placeholder:text-[#DBDBDB]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              onKeyDown={handleKeyPress}
            />
          </div>

          <button
            className="bg-[#9ACB34] p-3 rounded-md disabled:opacity-50"
            onClick={handleSendMessage}
            disabled={loading || !message.trim()}
          >
            <Image src='/icons/icon _send_.svg' alt='sendicon' width={16} height={16} />
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default InsightsPanel;
