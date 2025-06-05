// HomePage.jsx - home page

import React, { useState } from "react";
import PaletteDisplay from "../components/PaletteDisplay";
import PaletteType from "../components/PaletteType";
import "../styles/HomePage.css";
import "../styles/NavBar.css";

export default function HomePage() {
  const [mood, setMood] = useState("");
  const [mode, setMode] = useState("analogic");
  const [randomBaseColor, setRandomBaseColor] = useState(null);
  const [randomTrigger, setRandomTrigger] = useState(null);

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

  return (
    <div className="app">
      <main className="main-content">
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

        <div className="controls-container">
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
        />
      </main>

      <footer className="footer">© 2025 Anita Daniel</footer>
    </div>
  );
}