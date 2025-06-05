export async function getRandomPalette(mode = "analogic", baseHex = null) {
  const countByMode = {
    complement: 2,
    triad: 3,
    monochrome: 5,
    analogic: 5,
    "analogic-complement": 5,
  };

  const count = countByMode[mode] || 5;

  const hex = baseHex || Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");

  try {
    const response = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=${count}`
    );

    if (!response.ok) throw new Error("Failed to fetch random palette");

    const data = await response.json();
    return data.colors.map((c) => c.hex.value);
  } catch (err) {
    console.error("Random palette error:", err);
    return [];
  }
}