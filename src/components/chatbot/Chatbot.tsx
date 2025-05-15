
import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Button } from "@/components/ui/button";
import { 
  Drawer, 
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger 
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { 
  generateGeminiResponse, 
  type ChatMessage as ChatMessageType 
} from "@/utils/geminiApi";
import { MessageSquare, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: "bot",
      content: "Hello! I'm your PathPilot AI assistant. How can I help you with career guidance, college recommendations, or entrance exam information today?"
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      role: "user",
      content: message
    };
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    // Create context-aware prompt
    const prompt = `
You are PathPilot AI, an educational and career guidance assistant for a website that helps students in India find the right career paths, colleges, and entrance exams. 
Respond in ${language === 'hindi' ? 'Hindi' : 'English'} language.

Provide helpful, accurate information about:
- Career paths and job opportunities in various fields
- College recommendations for different careers
- Entrance exam details and preparation tips
- Application processes for colleges and jobs

User query: ${message}
    `;

    // Get bot response
    const response = await generateGeminiResponse(prompt);
    
    // Add bot response
    const botMessage: ChatMessageType = {
      role: "bot",
      content: response
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsProcessing(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button 
            className="rounded-full h-14 w-14 shadow-lg bg-pp-purple hover:bg-pp-bright-purple"
            size="icon"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <div className="max-w-md mx-auto w-full">
            <DrawerHeader className="flex flex-row items-center justify-between px-4">
              <DrawerTitle className="text-xl">{t("pathPilotAssistant")}</DrawerTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)} 
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerHeader>
            
            <Separator />
            
            <div className="px-4 py-4">
              <div className="h-[50vh] overflow-y-auto px-1">
                {messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
                <div ref={messagesEndRef} />
                {isProcessing && (
                  <div className="flex justify-start mb-4 gap-3">
                    <div className="bg-muted text-foreground rounded-lg px-4 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-pp-purple animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 rounded-full bg-pp-purple animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        <div className="w-2 h-2 rounded-full bg-pp-purple animate-bounce" style={{ animationDelay: "600ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <ChatInput 
                onSend={handleSendMessage} 
                disabled={isProcessing} 
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
