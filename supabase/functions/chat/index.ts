import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, quizContext } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let systemContent = `You are PathPilot AI Assistant — an expert career guidance counselor specializing in the Indian education system and job market. 

Your capabilities:
- Deep knowledge of Indian education paths (after 10th, 12th, graduation)
- Understanding of entrance exams (JEE, NEET, GATE, CAT, UPSC, etc.)
- Knowledge of top Indian colleges and universities
- Awareness of Indian job market trends and salary ranges
- Expertise in career planning, skill development, and personal growth

Guidelines:
- Be warm, encouraging, and specific in your advice
- Use markdown formatting for better readability (headers, bullet points, bold text)
- Provide actionable steps, not just generic advice
- Reference specific Indian institutions, exams, and opportunities when relevant
- If the user has quiz results, reference those to give personalized advice
- Keep responses focused and well-structured`;

    if (quizContext) {
      systemContent += `\n\nUser's Career Assessment Results:
- Education Stage: ${quizContext.educationStage || 'Not specified'}
- Strengths: ${quizContext.strengths?.join(', ') || 'Not available'}
- Growth Areas: ${quizContext.weaknesses?.join(', ') || 'Not available'}
- Recommended Paths: ${quizContext.recommendedPaths?.join(', ') || 'Not available'}
- Top Career Matches: ${Object.entries(quizContext.careerMatchScores || {}).map(([career, score]) => `${career} (${score}%)`).join(', ') || 'Not available'}
- Personality Type: ${quizContext.personalityProfile?.type || 'Not available'}

Use this information to provide highly personalized career guidance.`;
    }

    console.log('Calling Lovable AI Gateway with streaming...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemContent },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content
          }))
        ],
        stream: true,
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
          JSON.stringify({ error: 'AI service quota exceeded. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Failed to generate response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
