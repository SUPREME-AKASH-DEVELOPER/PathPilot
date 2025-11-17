import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuestionHistory {
  question: string;
  answer: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      currentQuestion, 
      selectedAnswer, 
      questionHistory, 
      educationStage 
    } = await req.json();

    if (!currentQuestion || !selectedAnswer) {
      return new Response(
        JSON.stringify({ error: 'Current question and answer are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build context from question history
    const historyContext = questionHistory && questionHistory.length > 0 
      ? `\n\nPrevious Questions and Answers:\n${questionHistory.map((qa: QuestionHistory) => 
          `Q: ${qa.question}\nA: ${qa.answer}`
        ).join('\n\n')}`
      : '';

    const systemPrompt = `You are an expert career guidance counselor creating personalized quiz questions for students.

Your task is to generate ONE follow-up question based on the student's previous answers. The question should:
1. Be highly relevant to their career interests based on their answers
2. Help narrow down their career path more specifically
3. Be progressively more detailed and specific as more questions are answered
4. Be engaging and thought-provoking
5. Provide 4 distinct, meaningful answer options

Education Stage: ${educationStage || 'General'}

Return ONLY a valid JSON object in this exact format, with no additional text:
{
  "question": "Your follow-up question here",
  "options": ["option1", "option2", "option3", "option4"]
}`;

    const userPrompt = `Current Question: "${currentQuestion}"
User's Answer: "${selectedAnswer}"${historyContext}

Generate an appropriate follow-up question that helps narrow down their career interests and aligns with their previous answers.`;

    console.log('Generating quiz question with Lovable AI...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service quota exceeded.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Failed to generate question' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content || '';

    // Parse the JSON response
    let parsedQuestion;
    try {
      // Try to extract JSON from the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedQuestion = JSON.parse(jsonMatch[0]);
      } else {
        parsedQuestion = JSON.parse(generatedText);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Return fallback question
      return new Response(
        JSON.stringify({
          question: "What aspect of your chosen field interests you most?",
          options: [
            "The technical and analytical aspects",
            "The creative and innovative opportunities",
            "The people and social impact",
            "The problem-solving and challenges"
          ]
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Successfully generated quiz question');

    return new Response(
      JSON.stringify({
        question: parsedQuestion.question,
        options: parsedQuestion.options
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-quiz-question function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
