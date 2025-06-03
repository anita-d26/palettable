// HomePage.jsx - home page

import React, { useState } from 'react';
import PaletteDisplay from '../components/PaletteDisplay';
import PaletteType from "../components/PaletteType";
import "../styles/HomePage.css";

export default function HomePage() {
  const [mood, setMood] = useState("");
  const [mode, setMode] = useState("analogic");

  const modes = [
    "analogic",
    "monochrome",
    "complement",
    "triad",
  ];

  const modePreviewColors = {
    analogic: ["#87baab", "#a8d5bb", "#d4eac8"],
    monochrome: ["#512d38", "#633745", "#755253"],
    "monochrome-dark": ["#2c1e1f", "#3e2a2b", "#4f393a"],
    "monochrome-light": ["#f4bfdb", "#ffe9f3", "#fff5f9"],
    complement: ["#b27092", "#70b28f"],
    triad: ["#b27092", "#70b28f", "#b2b270"],
    "analogic-complement": ["#87baab", "#a8d5bb", "#d4eac8", "#ffcfdf"],
  };

  const handleRandomizeMode = () => {
    const randomIndex = Math.floor(Math.random() * modes.length);
    setMode(modes[randomIndex]);
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Palettable</h1>
      <input
        type="text"
        placeholder="Enter a mood (e.g., serene, electric)"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="mood-input"
      />
      <div className="controls-container">
        <PaletteType
          mode={mode}
          setMode={setMode}
          modePreviewColors={modePreviewColors}
        />
        <button onClick={handleRandomizeMode} className="randomize-button">
          Randomize Palette Type
        </button>
      </div>
      <PaletteDisplay mood={mood} mode={mode} />
    </div>
  );
}