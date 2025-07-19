// MoodToPalette.js - Maps moods to color palettes using AI and color harmony APIs

import { GoogleGenAI } from "@google/genai";
import { getHexFromMoodGemini } from "./getHexFromMoodGemini";

// Initialize Google Gemini AI client with API key
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

// Fallback static mapping of moods to base hex colors
const moodColorMap = {
  serene: "#87baab",
  electric: "#ff00ff",
  nostalgic: "#b27092",
  happy: "#ffd700",
  moody: "#512d38",
  cozy: "#d9a5b3",
  dreamy: "#f4bfdb",
  mysterious: "#2e2c2f",
  joyful: "#f9c80e",
  vibrant: "#f86624",
  calm: "#a3c4f3",
  energetic: "#ff595e",
  romantic: "#ffb4a2",
  melancholy: "#5d737e",
  autumnal: "#cc5803",
  icy: "#b3e2e7",
  tropical: "#00bfb2",
  earthy: "#8b5e3c",
  luxurious: "#6a0572",
  gloomy: "#4a4e69",
  hopeful: "#a8dadc",
  rebellious: "#9d0208",
  forest: "#2d6a4f",
  oceanic: "#0077b6",
  playful: "#ff9f1c",
  enchanted: "#7b2cbf",
  futuristic: "#5bc0eb",
  celestial: "#6a4c93",
  anxious: "#c44536",
  peaceful: "#bfd7ea",
  inspired: "#fcbf49",
  determined: "#6a994e",
  confident: "#3a86ff",
  overwhelmed: "#9e2a2b",
  affectionate: "#ffcad4",
  curious: "#d0f4de",
  focused: "#264653",
  frustrated: "#d62828",
  passionate: "#e63946",
  relaxed: "#bee1e6",
  sensitive: "#f5c7b8",
  lonely: "#495867",
  empowered: "#ef476f",
  surprised: "#ffd166",
  cautious: "#f4a261",
  tired: "#b5b5b5",
  silly: "#f7aef8",
  default: "#512d38",
  sad: "#0071b6",
};

// Number of colors to request per harmony mode
const countByMode = {
  complement: 2,
  triad: 3,
  monochrome: 5,
  analogic: 5,
  "analogic-complement": 5,
};

// === 1. AI Explanation Palette ===
/**
 * Uses Google Gemini AI to generate a palette of hex colors with explanations for a mood.
 * The AI response is expected to be ONLY a JSON array of objects: [{hex, explanation}, ...]
 * @param {string} mood - Mood description string.
 * @param {number} count - Number of palette entries requested (not currently used in prompt).
 * @returns {Promise<Array<{hex: string, explanation: string}>>}
 */
export async function getPaletteWithExplanations(mood,  mode = "analogic", count = 5) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          parts: [
            {
              text: `You are a color theory expert. Given the mood "${mood}" and the color harmony style "${mode}", generate a JSON array of ${count} hex color values that represent that mood and match the harmony rule.

            Respond ONLY with a JSON array like this (no markdown or extra text):

[
  { "hex": "#FF5733", "explanation": "A warm orange to evoke energy and happiness." },
  ...
]`
            },
          ],
        },
      ],
    });

    const text = response.text.trim();
    let cleaned = rawText.trim();

    // Remove Markdown-style code block markers (```json ... ```)
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.replace(/```json/, "").replace(/```$/, "").trim();
    }

const parsed = JSON.parse(cleaned);
    if (!Array.isArray(palette)) throw new Error("Invalid palette format");

    return palette;
  } catch (error) {
    console.error("Gemini API error or JSON parse error:", error);
    return []; // fallback to empty array on error
  }
}

// === 2. Standard Harmony Palette ===
/**
 * Generates a standard color harmony palette from a mood using The Color API.
 * First tries to get a base color from AI; if it fails, uses fallback static map.
 * @param {string} mood - Mood string.
 * @param {string} mode - Palette harmony mode (default "analogic").
 * @returns {Promise<string[]>} Array of hex color strings.
 */
export async function getPaletteFromMood(mood, mode = "analogic") {
  const count = countByMode[mode] || 5;

  let baseColor;
  try {
    // Try to get base color from AI Gemini API
    baseColor = await getHexFromMoodGemini(mood);
  } catch (e) {
    // Fallback to static color map if AI call fails
    baseColor = moodColorMap[mood.toLowerCase()] || moodColorMap.default;
  }

  try {
    // Fetch palette from The Color API using base color and harmony mode
    const response = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${baseColor.replace("#", "")}&mode=${mode}&count=${count}`
    );

    if (!response.ok) {
      throw new Error("Color API request failed");
    }

    const data = await response.json();
    const colors = data.colors.map((color) => color.hex.value);
    return colors;
  } catch (error) {
    console.error("Failed to fetch palette:", error);
    throw error;
  }
}

// === 3. With Explanations Wrapper ===
/**
 * Wrapper function to get AI-generated palette with explanations.
 * @param {string} mood - Mood string.
 * @param {string} mode - Palette harmony mode (currently unused in AI prompt).
 * @returns {Promise<Array<{hex: string, explanation: string}>>}
 */
export async function getPaletteFromMoodWithExplanations(mood, mode = "analogic") {
  const count = countByMode[mode] || 5;
  
  try {
    // Call AI to get palette + explanations
    return await getPaletteWithExplanations(mood, mode, count);
  } catch (error) {
    console.warn("AI palette failed, falling back to harmony palette");
    // Fallback: get color API palette without explanations
    const colors = await getPaletteFromMood(mood, mode);
    return colors.map(hex => ({ hex, explanation: "" }));
  }
}