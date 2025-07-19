// PaletteDisplay.jsx - displays a palette based on a mood or random selection

import React, { useState, useEffect } from "react";
import { getPaletteFromMoodWithExplanations } from "../utils/MoodToPalette"; // AI mood-based palette
import { getRandomPalette } from "../utils/getRandomPalette";                // Random palette generator
import ColorBlock from "../components/ColorBlock";                           // Single color display
import "../styles/PaletteDisplay.css";                                      // Styles

export default function PaletteDisplay({ mood, mode, randomTrigger, randomBaseColor, onColorsChange }) {
  // State: palette colors with optional AI explanations
  const [palette, setPalette] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Skip if nothing is set
    if (!randomTrigger && !mood) {
      setPalette([]);
      return;
    }

    const timer = setTimeout(() => {
      const fetchPalette = async () => {
        setLoading(true);
        setError(null);

        try {
          let colorsWithExplanations = [];

          if (randomTrigger) {
            const colors = await getRandomPalette(mode, randomBaseColor);
            colorsWithExplanations = colors.map((hex) => ({
              hex,
              explanation: "", // No explanations for random palettes
            }));
          } else if (mood) {
            colorsWithExplanations = await getPaletteFromMoodWithExplanations(mood, mode);
          }

          setPalette(colorsWithExplanations);

          if (onColorsChange) {
            onColorsChange(colorsWithExplanations.map((c) => c.hex));
          }
        } catch (err) {
          setError("Failed to load palette");
        } finally {
          setLoading(false);
        }
      };

      fetchPalette();
    }, 800); // debounce

    return () => clearTimeout(timer);
  }, [randomTrigger, mood, mode, randomBaseColor, onColorsChange]);


  if (loading) {
    return (
      <div className="text-center mt-10 font-semibold">
        Loading palette...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="palette-display-wrapper">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4">
        {palette.map(({ hex, explanation }, index) => (
          <div key={index}>
            <ColorBlock hex={hex} />
            {/* Show explanation only if exists */}
            {explanation && (
              <p className="text-xs text-gray-600 italic mt-1">{explanation}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}