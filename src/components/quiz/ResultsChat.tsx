
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QuizResult } from "@/hooks/use-quiz-results";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
}

interface ResultsChatProps {
  result: QuizResult;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export default function ResultsChat({ result }: ResultsChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      content: "Hi there! 👋 I'm your **career guidance assistant**. I have access to your quiz results and can help you:\n\n- 🔍 Understand your career matches in detail\n- 📊 Explain your skills assessment\n- 🛤️ Plan your next steps\n- 💡 Answer specific questions about any career path\n\nWhat would you like to know?",
      role: 'assistant',
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;
    
    const userMsg: Message = {
      id: crypto.randomUUID(),
      content: newMessage,
      role: 'user',
    };
    
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setNewMessage('');
    setIsLoading(true);

    let assistantContent = "";
    
    try {
      const chatMessages = allMessages.map(m => ({ role: m.role, content: m.content }));
      
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: chatMessages,
          quizContext: {
            educationStage: result.educationStage,
            strengths: result.strengths,
            weaknesses: result.weaknesses,
            recommendedPaths: result.recommendedPaths,
            careerMatchScores: result.careerMatchScores,
            personalityProfile: result.personalityProfile,
            skillsAssessment: result.skillsAssessment
          }
        }),
      });

      if (resp.status === 429 || resp.status === 402) {
        toast({ title: "Error", description: "AI service temporarily unavailable. Please try again.", variant: "destructive" });
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
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant' && prev.length > allMessages.length) {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
                }
                return [...prev, { id: crypto.randomUUID(), role: 'assistant', content: assistantContent }];
              });
            }
          } catch { /* partial JSON */ }
        }
      }

      if (!assistantContent) {
        setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: "I'm sorry, I couldn't respond right now. Please try again." }]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { 
        id: crypto.randomUUID(), 
        role: 'assistant', 
        content: "I'm sorry, I'm having trouble responding. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full h-[500px] flex flex-col overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-pp-purple/5 to-pp-bright-purple/5">
        <CardTitle className="text-lg flex items-center">
          <MessageCircle className="mr-2 h-5 w-5 text-pp-purple" />
          Discuss Your Career Path
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-[370px] px-4">
          <div className="space-y-4 pt-2 pb-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start gap-2 max-w-[85%]">
                    {message.role === 'assistant' && (
                      <Avatar className="h-7 w-7 mt-1 shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-pp-purple to-pp-bright-purple text-white text-xs">
                          <Bot className="h-3.5 w-3.5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-2xl px-3.5 py-2.5 ${
                      message.role === 'user'
                        ? 'bg-pp-purple text-white dark:bg-pp-bright-purple rounded-br-sm'
                        : 'bg-muted dark:bg-gray-800 rounded-bl-sm'
                    }`}>
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="h-7 w-7 mt-1 shrink-0">
                        <AvatarFallback className="text-xs"><User className="h-3.5 w-3.5" /></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex items-center gap-1 px-4 py-2">
                <div className="w-2 h-2 bg-pp-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-pp-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-pp-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-0 border-t p-3">
        <div className="flex w-full items-center gap-2">
          <Textarea 
            placeholder="Ask about your career options..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="min-h-[50px] max-h-[100px] resize-none rounded-xl"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon" 
            className="h-[50px] w-[50px] shrink-0 bg-pp-purple hover:bg-pp-bright-purple rounded-xl"
            disabled={isLoading || !newMessage.trim()}
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
