
import { toast } from "@/hooks/use-toast";

// Using the provided Gemini API key
const GEMINI_API_KEY = "AIzaSyCwBEPts8OarwTet1h-khpoCcpDkzXNM7Y";

export interface ChatMessage {
  role: "user" | "bot";
  content: string;
}

export const generateGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Extract text from the response based on Gemini API structure
    if (data.candidates && 
        data.candidates[0] && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Unexpected response format from Gemini API");
    }
  } catch (error) {
    console.error("Error generating response:", error);
    toast({
      title: "Chat Error",
      description: "Failed to generate response. Please try again.",
      variant: "destructive",
    });
    return "Sorry, I'm having trouble responding right now. Please try again later.";
  }
};
