
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Define types for our messages
interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

export function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  // Initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = language === 'english' 
        ? "Hello! I'm PathPilot AI assistant. How can I help you with career guidance, college recommendations, or entrance exam information today?"
        : "नमस्ते! मैं PathPilot AI सहायक हूं। आज मैं आपकी करियर मार्गदर्शन, कॉलेज सिफारिशों, या प्रवेश परीक्षा जानकारी के साथ कैसे मदद कर सकता हूं?";
      
      setMessages([{
        role: 'bot',
        content: greeting
      }]);
    }
  }, [isOpen, messages.length, language]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Prepare context about the app's purpose
      const context = language === 'english'
        ? "You are PathPilot AI assistant for a career guidance platform. Help users with career options, college recommendations, entrance exam information, and job application advice for Indian students. Be concise and helpful."
        : "आप भारतीय छात्रों के लिए करियर मार्गदर्शन प्लेटफॉर्म के लिए PathPilot AI सहायक हैं। उपयोगकर्ताओं को करियर विकल्पों, कॉलेज सिफारिशों, प्रवेश परीक्षा जानकारी और नौकरी आवेदन सलाह के साथ मदद करें। संक्षिप्त और सहायक रहें।";
      
      // Call Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCwBEPts8OarwTet1h-khpoCcpDkzXNM7Y`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: context },
                  { text: `User's language preference: ${language}` },
                  { text: userMessage }
                ]
              }
            ]
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the response text
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        (language === 'english' 
          ? "I'm sorry, I couldn't process your request. Please try again."
          : "मुझे खेद है, मैं आपके अनुरोध को संसाधित नहीं कर सका। कृपया पुन: प्रयास करें।");
      
      setMessages(prev => [...prev, { role: 'bot', content: botReply }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      // Show error message in the chat
      const errorMessage = language === 'english'
        ? "Sorry, I'm having trouble connecting right now. Please try again later."
        : "क्षमा करें, मुझे अभी कनेक्ट करने में समस्या हो रही है। कृपया बाद में पुनः प्रयास करें।";
      
      setMessages(prev => [...prev, { role: 'bot', content: errorMessage }]);
      
      // Also show a toast notification
      toast({
        variant: "destructive",
        title: language === 'english' ? "Connection Error" : "कनेक्शन त्रुटि",
        description: language === 'english' 
          ? "Failed to connect to the AI service" 
          : "AI सेवा से कनेक्ट करने में विफल",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            className="h-12 w-12 rounded-full bg-primary shadow-lg hover:bg-primary/90 transition-all"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        
        <SheetContent className="sm:max-w-[400px] p-0 flex flex-col h-[80vh]">
          <SheetHeader className="px-4 py-3 border-b">
            <SheetTitle className="text-lg flex items-center justify-between">
              <span>{t('chatWithAI') || 'Chat with PathPilot AI'}</span>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < message.content.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t('typeYourMessage') || (language === 'english' ? 'Type your message...' : 'अपना संदेश लिखें...')}
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSend} 
                disabled={!input.trim() || isLoading}
                className="rounded-md px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
