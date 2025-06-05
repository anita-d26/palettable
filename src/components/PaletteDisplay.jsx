// PaletteDisplay.jsx - shows generated color palette

import React, { useState, useEffect } from "react";
import { getPaletteFromMood } from "../utils/MoodToPalette";
import { getRandomPalette } from "../utils/getRandomPalette";
import ColorBlock from "../components/ColorBlock";
import "../styles/PaletteDisplay.css";

export default function PaletteDisplay({ mood, mode, randomTrigger, randomBaseColor, onColorsChange }) {
  const [palette, setPalette] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPalette = async () => {
      setLoading(true);
      setError(null);

      try {
        let colors = [];

        if (randomTrigger) {
          colors = await getRandomPalette(mode, randomBaseColor);
        } else if (mood) {
          colors = await getPaletteFromMood(mood, mode);
        }

        setPalette(colors);

        if (onColorsChange) {
          onColorsChange(colors);
        }

      } catch (err) {
        setError("Failed to load palette");
      } finally {
        setLoading(false);
      }
    };

    if (randomTrigger || mood) {
      fetchPalette();
    } else {
      setPalette([]);
    }
  }, [mood, mode, randomTrigger]);

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: 40, fontWeight: "600" }}>
        Loading palette...
      </div>
    );

  if (error)
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: 40 }}>
        {error}
      </div>
    );

  if (!palette.length)
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: 40,
          fontWeight: "600",
          color: "#666",
        }}
      >
        Enter a mood or generate a random palette
      </div>
    );

  const handleSavePalette = () => {
  if (!palette || palette.length === 0) return;

  const existing = JSON.parse(localStorage.getItem("savedPalettes")) || [];
  const newSaved = [...existing, palette];
  localStorage.setItem("savedPalettes", JSON.stringify(newSaved));
};

  return (
    <div className="palette-display-wrapper">
      <div className="palette-display-container">
      {palette.map((color, index) => (
        <ColorBlock key={index} hex={color} />
      ))}
      </div>

        {palette.length > 0 && (
    <div className="save-button-wrapper">
      <button onClick={handleSavePalette} className="save-button">
        Save Palette
      </button>
    </div>
    )}
    </div>
  );
}