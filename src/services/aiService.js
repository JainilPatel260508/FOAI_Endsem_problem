import axios from 'axios';
import { AI_API_URL } from '../constants';

const AI_TOKEN = import.meta.env.VITE_AI_TOKEN;

export const askAI = async (messages, context) => {
  const systemPrompt = `You are a dashboard assistant.
You can ONLY answer questions using the provided dashboard data.
If information is unavailable in dashboard state, respond:
'I can only answer based on current ISS and News dashboard data.'

CURRENT DASHBOARD DATA:
${JSON.stringify(context, null, 2)}

Strictly follow the rules above. Do not hallucinate.`;

  try {
    const prompt = `<s>[INST] ${systemPrompt} \n\n User Question: ${messages[messages.length - 1].content} [/INST]`;

    const { data } = await axios.post(
      AI_API_URL,
      { 
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          return_full_text: false
        }
      },
      {
        headers: {
          Authorization: `Bearer ${AI_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let responseText = '';
    if (Array.isArray(data)) {
      responseText = data[0].generated_text;
    } else {
      responseText = data.generated_text;
    }

    return responseText.trim();
  } catch (error) {
    console.error('AI API error:', error);
    throw new Error('AI Assistant is currently unavailable.');
  }
};
