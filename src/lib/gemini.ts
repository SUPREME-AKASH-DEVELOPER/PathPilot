
import { ENV } from "./env";
import { toast } from "@/hooks/use-toast";

// Interface for Gemini API Response
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason: string;
  }>;
}

// Process the response text to remove unwanted characters
function processResponseText(text: string): string {
  // Remove asterisks (both * and **) as requested
  return text.replace(/\*+/g, '');
}

// Function to generate content using Gemini API
export async function generateWithGemini(prompt: string): Promise<string> {
  try {
    const apiKey = ENV.GEMINI_API_KEY;
    const model = ENV.GEMINI_MODEL;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json() as GeminiResponse;
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response generated");
    }
    
    const responseText = data.candidates[0].content.parts[0].text;
    // Process the response to remove asterisks
    return processResponseText(responseText);
  } catch (error) {
    console.error("Gemini API error:", error);
    toast.error("Failed to generate response", 
      error instanceof Error ? error.message : "Unknown error");
    return "Sorry, I couldn't generate a response at this time.";
  }
}
