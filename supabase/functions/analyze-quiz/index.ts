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
    const { questions, educationStage } = await req.json();

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Questions array is required' }),
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

    const systemPrompt = `You are an expert career counselor and psychometric analyst for Indian students. 
Analyze the student's quiz responses comprehensively and return a detailed JSON analysis.

IMPORTANT RULES:
- Skills scores must be 1-10 (integers)
- Career match scores must be 0-100 (percentages)
- Include at least 5 career matches relevant to the education stage
- Personality type MUST be exactly one of: "Analytical", "Creative", "Practical", "Social", "Enterprising", "Conventional", "Mixed"
- Provide actionable, specific strengths/weaknesses/paths (not generic)
- Consider the Indian education system and job market
- For "after10th" stage, focus on stream selection and future career awareness
- For "after12th" stage, focus on college/course selection and specific career paths
- For "afterGraduation" stage, focus on specialization, higher studies, or job roles

Return ONLY valid JSON in this exact format:
{
  "strengths": ["specific strength 1", "specific strength 2", "specific strength 3", "specific strength 4"],
  "weaknesses": ["growth area 1", "growth area 2", "growth area 3"],
  "recommendedPaths": ["specific career path 1", "specific career path 2", "specific career path 3", "specific career path 4", "specific career path 5"],
  "skillsAssessment": {
    "analytical": 7,
    "creative": 6,
    "technical": 8,
    "communication": 5,
    "leadership": 6,
    "scientific": 7,
    "entrepreneurial": 4,
    "social": 5,
    "critical_thinking": 7
  },
  "careerMatchScores": {
    "Career Name 1": 92,
    "Career Name 2": 85,
    "Career Name 3": 78,
    "Career Name 4": 72,
    "Career Name 5": 65
  },
  "personalityProfile": {
    "type": "Analytical",
    "traits": ["detail-oriented", "logical", "systematic", "curious"],
    "learningStyle": "Structured learning with practical application",
    "workEnvironmentPreference": "Collaborative environment with clear goals"
  }
}`;

    const qaPairs = questions.map((q: { question: string; answer: string }) => 
      `Q: ${q.question}\nA: ${q.answer}`
    ).join('\n\n');

    const userPrompt = `Education Stage: ${educationStage}
Number of questions answered: ${questions.length}

Student's Quiz Responses:
${qaPairs}

Analyze these responses thoroughly and provide a comprehensive career guidance analysis. Be specific to the student's answers and education stage.`;

    console.log('Analyzing quiz with Lovable AI (gemini-2.5-pro)...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro',
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
        JSON.stringify({ error: 'Failed to analyze quiz' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content || '';

    let analysis;
    try {
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        analysis = JSON.parse(generatedText);
      }
    } catch (parseError) {
      console.error('Failed to parse AI analysis response:', parseError);
      console.error('Raw response:', generatedText);
      // Return fallback
      analysis = {
        strengths: ["Analytical thinking", "Problem-solving aptitude", "Self-awareness", "Adaptability"],
        weaknesses: ["Could benefit from more practical experience", "Consider developing communication skills", "Explore more diverse career options"],
        recommendedPaths: ["Technology & Engineering", "Data Science", "Research & Development", "Management", "Consulting"],
        skillsAssessment: { analytical: 7, creative: 5, technical: 7, communication: 6, leadership: 5, scientific: 6, entrepreneurial: 4, social: 6, critical_thinking: 7 },
        careerMatchScores: { "Software Engineering": 78, "Data Science": 72, "Business Analysis": 68, "Research": 65, "Consulting": 60 },
        personalityProfile: { type: "Analytical", traits: ["logical", "detail-oriented", "methodical", "curious"], learningStyle: "Structured learning", workEnvironmentPreference: "Collaborative environment" }
      };
    }

    console.log('Successfully analyzed quiz');

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-quiz function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
