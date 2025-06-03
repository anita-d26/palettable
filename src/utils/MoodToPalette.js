// MoodToPalette.js - maps mood to colors (api)

export async function getPaletteFromMood(mood, mode = "analogic") {
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
    default: "#512d38"
  };

  // Determine number of colors to request based on palette mode
  const countByMode = {
    complement: 2,
    triad: 3,
    monochrome: 5,
    "monochrome-dark": 5,
    "monochrome-light": 5,
    analogic: 5,
    "analogic-complement": 5,
  };

  const baseColor = moodColorMap[mood.toLowerCase()] || moodColorMap.default;

  // Fallback to 5 if mode not in countByMode
  const count = countByMode[mode] || 5;

  try {
    const response = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${baseColor.replace(
        "#",
        ""
      )}&mode=${mode}&count=${count}`
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