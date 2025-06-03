// PaletteDisplay.jsx - shows generated color palette

import React, { useState, useEffect } from "react";
import { getPaletteFromMood } from "../utils/MoodToPalette";
import "../styles/PaletteDisplay.css";

export default function PaletteDisplay({ mood, mode }) {
  const [palette, setPalette] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mood) {
      setPalette([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    getPaletteFromMood(mood, mode)
      .then((colors) => {
        setPalette(colors);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load palette");
        setLoading(false);
      });
  }, [mood, mode]);

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
        Enter a mood to generate a palette
      </div>
    );

  return (
    <div className="palette-display-container">
      {palette.map((color, index) => (
        <div
          key={index}
          className="color-block"
          style={{
            backgroundColor: color,
            boxShadow: `0 8px 18px ${color}70`,
          }}
          title={color}
        />
      ))}
    </div>
  );
}