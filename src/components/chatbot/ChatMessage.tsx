
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessage as ChatMessageType } from "@/utils/geminiApi";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === "bot";
  
  return (
    <div className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"} mb-4`}>
      {isBot && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-pp-purple text-white">AI</AvatarFallback>
          <AvatarImage src="/bot-avatar.png" />
        </Avatar>
      )}
      
      <div className={`${
        isBot 
          ? "bg-muted text-foreground" 
          : "bg-pp-purple text-white"
        } px-4 py-2 rounded-lg max-w-[80%] break-words`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      
      {!isBot && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gray-300">ME</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
