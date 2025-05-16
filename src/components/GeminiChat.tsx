
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { generateWithGemini } from "@/lib/gemini";
import { Loader2 } from "lucide-react";

const GeminiChat: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await generateWithGemini(userInput);
      setResponse(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Gemini AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Ask me anything..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="min-h-[100px]"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="w-full bg-pp-purple hover:bg-pp-purple/90 dark:bg-pp-bright-purple dark:hover:bg-pp-bright-purple/90"
            disabled={isLoading || !userInput.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : "Generate Response"}
          </Button>
        </form>

        {response && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Response:</h3>
            <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeminiChat;
