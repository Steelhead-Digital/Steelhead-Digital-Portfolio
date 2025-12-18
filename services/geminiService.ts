import { GoogleGenAI, Type, Schema } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Schema for structured project estimation
const estimationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    estimatedDuration: {
      type: Type.STRING,
      description: "Estimated time to complete the project (e.g., '4-6 weeks').",
    },
    suggestedTechStack: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of recommended technologies (e.g., React, Node.js).",
    },
    complexityLevel: {
      type: Type.STRING,
      enum: ["Low", "Medium", "High"],
      description: "Overall technical complexity.",
    },
    briefAnalysis: {
      type: Type.STRING,
      description: "A short professional analysis of the project requirements (max 2 sentences).",
    },
  },
  required: ["estimatedDuration", "suggestedTechStack", "complexityLevel", "briefAnalysis"],
};

export const generateProjectEstimation = async (projectDescription: string) => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please configure the environment.");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a senior technical lead at a premium web agency called Steelhead Digital. 
      Analyze the following project request from a potential client and provide a professional, 
      constructive estimation. Be realistic but encouraging.
      
      Client Request: "${projectDescription}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: estimationSchema,
        systemInstruction: "You are helpful, professional, and concise. Do not use markdown in the JSON strings.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};