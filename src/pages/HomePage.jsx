// HomePage.jsx - home page, saves

import React, { useState } from "react";
import PaletteDisplay from "../components/PaletteDisplay";
import PaletteType from "../components/PaletteType";
import { savePalette } from "../utils/firebaseUtils";
import "../styles/HomePage.css";
import "../styles/NavBar.css";

export default function HomePage() {
  const [mood, setMood] = useState("");
  const [mode, setMode] = useState("analogic");
  const [randomBaseColor, setRandomBaseColor] = useState(null);
  const [randomTrigger, setRandomTrigger] = useState(null);
  const [colors, setColors] = useState([]);
  const [feedback, setFeedback] = useState("");


  const modePreviewColors = {
    monochrome: ["#512d38", "#633745", "#755253"],
    analogic: ["#87baab", "#a8d5bb", "#d4eac8"],
    complement: ["#b27092", "#70b28f"],
    "analogic-complement": ["#87baab", "#a8d5bb", "#d4eac8", "#ffcfdf"],
    triad: ["#b27092", "#70b28f", "#b2b270"],
  };

  const handleMoodChange = (e) => {
    setMood(e.target.value);
    setRandomTrigger(null);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const handleRandomizeColors = () => {
    const randomHex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");

      setRandomBaseColor(randomHex);
      setRandomTrigger(Date.now());
      setMood("");
    };

  const handleSave = async () => {
    if (colors.length === 0) {
      setFeedback("Please generate a palette first.");
      return;
    }

    if (!mood) {
      setFeedback("Tip: Add a mood to better organize your palette.");
    }

    try {
      await savePalette({
        mood: mood.toLowerCase(),
        paletteType: mode,
        hexValues: colors,
      });

      setFeedback("Palette saved! 🎉");
      setTimeout(() => setFeedback(""), 3000);
    } catch (error) {
      console.error("Error saving palette:", error);
      setFeedback("Failed to save palette.");
    }
  };

  const handleColorsChange = (newColors) => {
    setColors(newColors);
  };

  return (
    <div className="app">
      <main className="container">
        <div className="mood-bar-container">
          <input
            type="text"
            placeholder="Enter a mood..."
            value={mood}
            onChange={handleMoodChange}
            className="mood-input"
          />
          <button onClick={handleRandomizeColors} className="randomize-button">
            Generate Random Palette
          </button>
        </div>

        <div className="controls-wrapper">
          <PaletteType
            mode={mode}
            setMode={handleModeChange}
            modePreviewColors={modePreviewColors}
          />
        </div>

        <PaletteDisplay
          mood={mood}
          mode={mode}
          randomTrigger={randomTrigger}
          randomBaseColor={randomBaseColor}
          onColorsChange={handleColorsChange}
        />

        <div className="controls-wrapper">
          <button onClick={handleSave} className="save-button">
            Save Palette
          </button>
          {feedback && <p className="feedback-message">{feedback}</p>}
        </div>
      </main>
      <footer className="footer">© 2025 Anita Daniel</footer>
    </div>
  );
}