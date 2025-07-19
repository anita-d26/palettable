// getRandomPalette.js - Fetches a color palette from The Color API based on a mode and optional base color

/**
 * Fetches a random color palette from The Color API
 * @param {string} mode - The palette harmony mode (e.g., "analogic", "complement")
 * @param {string|null} baseHex - Optional base hex color (without #), generates random if null
 * @returns {Promise<string[]>} Array of hex color strings (e.g., ["#ff0000", "#00ff00", ...])
 */
export async function getRandomPalette(mode = "analogic", baseHex = null) {
  // Number of colors requested from API per palette mode
  const countByMode = {
    complement: 2,
    triad: 3,
    monochrome: 5,
    analogic: 5,
    "analogic-complement": 5,
  };

  // Default to 5 colors if mode not listed
  const count = countByMode[mode] || 5;

  // Generate random base hex color if none provided
  const hex = baseHex || Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");

  try {
    // Fetch palette from The Color API
    const response = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=${count}`
    );

    // Throw error if response not OK
    if (!response.ok) throw new Error("Failed to fetch random palette");

    // Parse JSON response
    const data = await response.json();

    // Return array of hex color values (with # included)
    return data.colors.map((c) => c.hex.value);
  } catch (err) {
    console.error("Random palette error:", err);
    // Return empty array on failure
    return [];
  }
}