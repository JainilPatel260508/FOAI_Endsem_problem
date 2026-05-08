import axios from 'axios';
import { AI_API_URL, AI_MODEL } from '../constants';

const AI_TOKEN = import.meta.env.VITE_AI_TOKEN;

export const askAI = async (messages, context) => {
  const systemPrompt = `You are a dashboard assistant for the ISS and Space News platform.
You can ONLY answer questions using the provided dashboard data.
If information is unavailable in dashboard state, respond:
'I can only answer based on current ISS and News dashboard data.'

CURRENT DASHBOARD DATA:
${JSON.stringify(context, null, 2)}

Strictly follow the rules above. Do not hallucinate.`;

  try {
    const { data } = await axios.post(
      AI_API_URL,
      { 
        model: AI_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({ role: m.role, content: m.content }))
        ],
        max_tokens: 500,
        temperature: 0.7,
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
