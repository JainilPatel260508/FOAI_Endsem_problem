import axios from 'axios';
import { AI_API_URL, AI_MODEL } from '../constants';

const AI_TOKEN = import.meta.env.VITE_AI_TOKEN;

export const askAI = async (messages, context) => {
  const systemPrompt = `You are AstroAI, the intelligent assistant for the ISS Tracker & Space News Dashboard.
Your purpose is to provide insights based on LIVE TELEMETRY and RECENT NEWS.

STRICT GROUNDING RULES:
1. ONLY use the "CURRENT DASHBOARD DATA" provided below.
2. If the user asks for information NOT in the data, politely explain that your access is restricted to real-time orbital and news telemetry.
3. Be concise, professional, and slightly "futuristic" in tone.
4. If asked about ISS location, mention the coordinates and nearest city/area if available.

CURRENT DASHBOARD DATA:
${JSON.stringify(context, null, 2)}

Response format: Markdown.`;

  try {
    const { data } = await axios.post(
      AI_API_URL,
      { 
        model: AI_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({ 
            role: m.role === 'assistant' ? 'assistant' : 'user', 
            content: m.content 
          }))
        ],
        max_tokens: 500,
        temperature: 0.4, // Lower temperature for more grounded responses
      },
      {
        headers: {
          Authorization: `Bearer ${AI_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('AI API error:', error.response?.data || error.message);
    throw new Error('AI Assistant is currently unavailable.');
  }
};
