
import { getEnv } from './env';

interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface PerplexityResponse {
  id: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function queryPerplexityAI(
  messages: PerplexityMessage[],
  model: string = 'llama-3.1-sonar-small-128k-online'
): Promise<string> {
  try {
    const apiKey = getEnv('PERPLEXITY_API_KEY');
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000,
        return_images: false,
        return_related_questions: false,
        search_domain_filter: ['perplexity.ai'],
        search_recency_filter: 'month',
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Perplexity API error: ${response.status} ${errorData}`);
    }

    const data = await response.json() as PerplexityResponse;
    return data.choices[0]?.message?.content || "No response content";
  } catch (error) {
    console.error("Error querying Perplexity AI:", error);
    throw error;
  }
}

// Function to generate dynamic next questions based on current answer
export async function generateNextQuestion(
  currentQuestion: string,
  selectedAnswer: string,
  questionHistory: Array<{question: string, answer: string}>
): Promise<{question: string, options: string[]}> {
  try {
    const systemPrompt = `You are an AI career guidance counselor helping students choose their education and career path. 
    Based on the current question and answer, generate a logical follow-up question with 4 possible answer options.
    Make questions increasingly specific and tailored to the previous answers.
    Return only JSON in this exact format without any additional text: {"question": "your follow-up question here", "options": ["option1", "option2", "option3", "option4"]}`;
    
    // Build context from question history
    const historyContext = questionHistory.length > 0 
      ? `Previous Q&A: ${questionHistory.map(qa => `Q: ${qa.question} A: ${qa.answer}`).join('; ')}. `
      : '';
    
    const userPrompt = `${historyContext}Current question: "${currentQuestion}". User selected answer: "${selectedAnswer}". Generate an appropriate follow-up question that helps narrow down their career interests.`;
    
    const result = await queryPerplexityAI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
    
    try {
      const parsedResult = JSON.parse(result);
      return {
        question: parsedResult.question,
        options: parsedResult.options
      };
    } catch (e) {
      console.error("Failed to parse Perplexity response:", e);
      return {
        question: "What specific area interests you most?",
        options: [
          "Technology and innovation",
          "Health and wellbeing",
          "Business and finance",
          "Creative arts and design"
        ]
      };
    }
  } catch (error) {
    console.error("Error generating next question:", error);
    return {
      question: "What specific area interests you most?",
      options: [
        "Technology and innovation",
        "Health and wellbeing",
        "Business and finance",
        "Creative arts and design"
      ]
    };
  }
}

// Function to analyze quiz responses and provide personalized insights
export async function analyzeQuizResponses(
  questions: Array<{question: string, answer: string}>,
  educationStage: string
): Promise<{
  strengths: string[];
  weaknesses: string[];
  recommendedPaths: string[];
  skillsAssessment: Record<string, number>;
  careerMatchScores: Record<string, number>;
}> {
  try {
    const systemPrompt = `You are an AI education and career analyst. 
    Based on the provided quiz responses, generate a comprehensive analysis of the student's strengths, weaknesses, 
    recommended career paths, a skills assessment with numerical scores (1-10), and career match scores (percentage).
    Return only JSON in this exact format: 
    {
      "strengths": ["strength1", "strength2", "strength3"],
      "weaknesses": ["weakness1", "weakness2"],
      "recommendedPaths": ["career path1", "career path2", "career path3"],
      "skillsAssessment": {"analytical": 8, "creative": 6, "communication": 7, "technical": 9},
      "careerMatchScores": {"Software Engineering": 85, "Data Science": 78, "UX Design": 65}
    }`;
    
    const userPrompt = `Education stage: ${educationStage}. Quiz Q&A: ${questions.map(q => `Q: ${q.question} A: ${q.answer}`).join('; ')}. Provide a detailed career analysis.`;
    
    const result = await queryPerplexityAI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
    
    try {
      return JSON.parse(result);
    } catch (e) {
      console.error("Failed to parse Perplexity analysis response:", e);
      return {
        strengths: ["Problem solving", "Critical thinking", "Technical aptitude"],
        weaknesses: ["Needs to improve communication skills", "Could benefit from more practical experience"],
        recommendedPaths: ["Technology", "Engineering", "Research"],
        skillsAssessment: {
          analytical: 7,
          creative: 5,
          communication: 6,
          technical: 8
        },
        careerMatchScores: {
          "Software Engineering": 75,
          "Data Science": 70,
          "UX Design": 60
        }
      };
    }
  } catch (error) {
    console.error("Error analyzing quiz responses:", error);
    return {
      strengths: ["Problem solving", "Critical thinking", "Technical aptitude"],
      weaknesses: ["Needs to improve communication skills", "Could benefit from more practical experience"],
      recommendedPaths: ["Technology", "Engineering", "Research"],
      skillsAssessment: {
        analytical: 7,
        creative: 5,
        communication: 6,
        technical: 8
      },
      careerMatchScores: {
        "Software Engineering": 75,
        "Data Science": 70,
        "UX Design": 60
      }
    };
  }
}
