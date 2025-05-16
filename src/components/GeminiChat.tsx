
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { generateWithGemini } from "@/lib/gemini";
import { Loader2, MessageCircle, Send } from "lucide-react";

const GeminiChat: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'bot', text: string}>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    const userMessage = userInput.trim();
    setChatHistory(prev => [...prev, {type: 'user', text: userMessage}]);
    setUserInput("");
    setIsLoading(true);
    
    try {
      const result = await generateWithGemini(userMessage);
      setChatHistory(prev => [...prev, {type: 'bot', text: result}]);
    } catch (error) {
      console.error("Error generating response:", error);
      setChatHistory(prev => [...prev, {type: 'bot', text: "Sorry, I couldn't process your request. Please try again."}]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-pp-purple/20">
      <CardHeader className="bg-pp-purple/5 dark:bg-pp-bright-purple/10">
        <CardTitle className="flex items-center text-pp-purple dark:text-pp-bright-purple">
          <MessageCircle className="mr-2 h-5 w-5" />
          PathPilot AI Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6 max-h-[500px] overflow-y-auto">
        {chatHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <MessageCircle className="mx-auto h-12 w-12 mb-3 opacity-50" />
            <p>Start a conversation with the AI assistant</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chatHistory.map((message, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-pp-purple/10 dark:bg-pp-bright-purple/20 ml-auto max-w-[80%]' 
                    : 'bg-gray-100 dark:bg-gray-800 mr-auto max-w-[80%]'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <Textarea
            placeholder="Ask me anything..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="min-h-[50px] resize-none"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (userInput.trim()) {
                  handleSubmit(e);
                }
              }
            }}
          />
          <Button 
            type="submit" 
            size="icon"
            className="bg-pp-purple hover:bg-pp-purple/90 dark:bg-pp-bright-purple dark:hover:bg-pp-bright-purple/90"
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
