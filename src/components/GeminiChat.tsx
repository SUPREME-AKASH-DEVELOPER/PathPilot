
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, Bot, User, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const GeminiChat: React.FC = () => {
  const { language } = useLanguage();
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcomeMessage = language === 'english' 
      ? "👋 Welcome to **PathPilot AI Assistant**! I'm here to help you with:\n\n- 🎯 Career guidance & planning\n- 📚 Education path recommendations\n- 💡 Skill development advice\n- 🏫 College & exam information\n\nAsk me anything about your career journey!"
      : "👋 **पाथपायलट AI सहायक** में आपका स्वागत है! मैं इन विषयों में आपकी मदद कर सकता हूँ:\n\n- 🎯 करियर मार्गदर्शन और योजना\n- 📚 शिक्षा पथ सिफारिशें\n- 💡 कौशल विकास सलाह\n- 🏫 कॉलेज और परीक्षा की जानकारी\n\nअपनी करियर यात्रा के बारे में कुछ भी पूछें!";
    
    setMessages([{ role: 'assistant', content: welcomeMessage }]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    
    const userMessage = userInput.trim();
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setUserInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: newMessages.filter(m => m.role === 'user' || m.role === 'assistant')
        }),
      });

      if (resp.status === 429) {
        toast({ title: "Rate Limited", description: "Too many requests. Please wait a moment.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      if (resp.status === 402) {
        toast({ title: "Quota Exceeded", description: "AI service quota exceeded.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      if (!resp.ok || !resp.body) throw new Error("Failed to start stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant' && prev.length > newMessages.length) {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
                }
                return [...prev, { role: 'assistant', content: assistantContent }];
              });
            }
          } catch { /* partial JSON, wait for more */ }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw || raw.startsWith(":") || !raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m));
            }
          } catch { /* ignore */ }
        }
      }

      if (!assistantContent) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I couldn\'t generate a response. Please try again.' }]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: language === 'english' 
          ? "Sorry, I couldn't process your request. Please try again." 
          : "क्षमा करें, मैं आपके अनुरोध को प्रोसेस नहीं कर सका। कृपया पुनः प्रयास करें।"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl border-pp-purple/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-pp-purple/10 to-pp-bright-purple/10 dark:from-pp-purple/20 dark:to-pp-bright-purple/20">
        <CardTitle className="flex items-center text-pp-purple dark:text-pp-bright-purple">
          <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
          {language === 'english' ? "PathPilot AI Assistant" : "पाथपायलट AI सहायक"}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] px-4">
          <div className="space-y-4 py-4">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2.5 max-w-[85%]`}>
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8 mt-1 shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-pp-purple to-pp-bright-purple text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-pp-purple text-white dark:bg-pp-bright-purple rounded-br-sm'
                          : 'bg-muted dark:bg-gray-800 rounded-bl-sm'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="h-8 w-8 mt-1 shrink-0">
                        <AvatarFallback className="bg-muted">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-2 bg-muted dark:bg-gray-800 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-pp-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-pp-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-pp-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <Textarea
            placeholder={language === 'english' ? "Ask about careers, education, skills..." : "करियर, शिक्षा, कौशल के बारे में पूछें..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="min-h-[50px] max-h-[120px] resize-none rounded-xl"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (userInput.trim()) handleSubmit(e);
              }
            }}
          />
          <Button 
            type="submit" 
            size="icon"
            className="bg-pp-purple hover:bg-pp-bright-purple dark:bg-pp-bright-purple dark:hover:bg-pp-purple transition-all rounded-xl h-[50px] w-[50px]"
            disabled={isLoading || !userInput.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default GeminiChat;
