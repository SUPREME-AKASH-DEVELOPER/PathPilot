
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <Input 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about colleges, careers, exams..."
        disabled={disabled}
        className="flex-grow"
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={!message.trim() || disabled}
        className="bg-pp-purple hover:bg-pp-bright-purple"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
