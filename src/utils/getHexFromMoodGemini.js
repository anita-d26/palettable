// getHexFromMoodGemini.js - Uses Google Gemini API to generate a hex color based on a mood string

import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client with your API key from environment variables
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

/**
 * Calls the Gemini API to get a hex color that represents the provided mood.
 * @param {string} mood - The user-input mood (e.g., "serene", "energetic").
 * @returns {Promise<string>} A hex color string (e.g., "#a1c4fd"), or fallback "#CCCCCC" on failure.
 */
export async function getHexFromMoodGemini(mood) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Fast, lightweight model
      contents: [
        {
          parts: [
            {
              text: `Suggest a single hex color code representing the mood "${mood}". Respond only with the hex code, nothing else.`
            }
          ]
        }
      ],
    });

    // Attempt to extract the hex color from the response
    const text = response.text.trim();
    const hexMatch = text.match(/#[0-9a-fA-F]{6}/);

    // Return the matched hex code or a fallback if not found
    return hexMatch ? hexMatch[0] : "#CCCCCC";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "#CCCCCC"; // Fallback hex code in case of error
  }
}