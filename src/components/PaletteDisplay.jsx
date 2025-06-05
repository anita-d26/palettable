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

  return (
    <div className="palette-display-wrapper">
      <div className="palette-display-container">
        {palette.map((color, index) => (
          <ColorBlock key={index} hex={color} />
        ))}
      </div>
    </div>
  );
}