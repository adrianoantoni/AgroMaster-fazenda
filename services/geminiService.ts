
import { GoogleGenAI, Type } from "@google/genai";

export const getAgroInsights = async (crops: any[], inventory: any[], finance: any[]) => {
  // Always initialize GoogleGenAI with a named parameter using process.env.API_KEY directly.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';

  const prompt = `
    As an AI Farm Management Expert, analyze the following data and provide:
    1. A strategic summary (2-3 sentences).
    2. Critical alerts (stock low, finance risks).
    3. Optimization tips for production.

    DATA:
    Crops: ${JSON.stringify(crops)}
    Inventory: ${JSON.stringify(inventory)}
    Finance: ${JSON.stringify(finance)}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            alerts: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "alerts", "recommendations"]
        }
      }
    });

    // Use .text property directly (not a method) to extract output.
    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Insight Error:", error);
    return {
      summary: "Data analysis currently unavailable. Check your internet connection.",
      alerts: ["Connection issue with AI services."],
      recommendations: ["Manually review stock levels."]
    };
  }
};
