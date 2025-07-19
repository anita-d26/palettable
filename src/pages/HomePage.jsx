// HomePage.jsx - Main homepage, allows mood-based palette generation, and saving to Firebase

import React, { useState } from "react";
import PaletteDisplay from "../components/PaletteDisplay"; // Component that displays the generated palette
import PaletteType from "../components/PaletteType";       // Component to choose palette harmony style
import { savePalette } from "../utils/firebaseUtils";      // Firebase utility to save palette data
import "../styles/HomePage.css";                           // Main styling for the homepage
import "../styles/NavBar.css";                             // Navigation bar styles

export default function HomePage() {
  // State variables for user input and palette generation
  const [mood, setMood] = useState("");                   // Mood input from the user
  const [mode, setMode] = useState("analogic");           // Current palette harmony mode
  const [randomBaseColor, setRandomBaseColor] = useState(null); // Random base color for random generation
  const [randomTrigger, setRandomTrigger] = useState(0);     // Triggers palette regeneration
  const [colors, setColors] = useState([]);               // Array of generated hex color values
  const [feedback, setFeedback] = useState("");           // Feedback message for user actions

  // Sample colors used for previewing each mode in PaletteType
  const modePreviewColors = {
    monochrome: ["#512d38", "#633745", "#755253"],
    analogic: ["#87baab", "#a8d5bb", "#d4eac8"],
    complement: ["#b27092", "#70b28f"],
    "analogic-complement": ["#87baab", "#a8d5bb", "#d4eac8", "#ffcfdf"],
    triad: ["#b27092", "#70b28f", "#b2b270"],
  };

  // Handles text input change for the mood
  const handleMoodChange = (e) => {
    setMood(e.target.value);
    setRandomTrigger(0); // Reset random trigger when typing a new mood
  };

  // Handles switching the color harmony mode
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  // Generates a random color and triggers a new palette
  const handleRandomizeColors = () => {
    const randomHex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");

    setRandomBaseColor(randomHex);     // Set new random color as base
    setRandomTrigger(Date.now());      // Update trigger to regenerate palette
    setMood("");                       // Clear mood input when randomizing
  };

  // Handles saving the current palette to Firebase
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

      setFeedback("Palette saved!");

      // Clear feedback after 3 seconds
      setTimeout(() => setFeedback(""), 3000);
    } catch (error) {
      console.error("Error saving palette:", error);
      setFeedback("Failed to save palette.");
    }
  };

  // Updates the current colors from the PaletteDisplay component
  const handleColorsChange = (newColors) => {
    setColors(newColors);
  };

  return (
    <div className="container">
      {/* Mood input and random palette generation button */}
      <div className="mood-bar-container">
        <input
          type="text"
          placeholder="Enter a mood..."
          value={mood}
          onChange={handleMoodChange}
          className="mood-input"
        />
      </div>

      {/* Controls for selecting palette type */}
      <div className="controls-wrapper">
        <PaletteType
          mode={mode}
          setMode={handleModeChange}
          modePreviewColors={modePreviewColors}
        />
        <button onClick={handleRandomizeColors} className="randomize-button">
          Generate Random Palette
        </button>
      </div>

      {/* Displays the generated palette based on mood/mode/randomization */}
      <PaletteDisplay
        mood={mood}
        mode={mode}
        randomTrigger={randomTrigger}
        randomBaseColor={randomBaseColor}
        onColorsChange={handleColorsChange}
      />

      {/* Save button and feedback message */}
      <div className="controls-wrapper">
        <button onClick={handleSave} className="save-button">
          Save Palette
        </button>
        {feedback && <p className="feedback-message">{feedback}</p>}
      </div>

      {/* Page footer */}
      <footer className="footer">© 2025 Anita Daniel</footer>
    </div>
  );
}