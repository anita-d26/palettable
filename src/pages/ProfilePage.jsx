// ProfilePage.jsx - users saved palettes

import React, { useState, useEffect } from "react";
import { getPalettes, clearPalettes } from "../utils/firebaseUtils";

export default function Profile() {
  const [savedPalettes, setSavedPalettes] = useState([]);

  useEffect(() => {
    const fetchPalettes = async () => {
      const saved = await getPalettes();
      setSavedPalettes(saved);
    };
    fetchPalettes();
  }, []);

  const clearAll = async () => {
    await clearPalettes();
    setSavedPalettes([]);
  };

  return (
    <div className="profile-page">
      <h2>Saved Palettes</h2>
      <button onClick={clearPalettes}>Clear All Saved Palettes</button>

      {savedPalettes.length === 0 && <p>No saved palettes yet.</p>}

      {savedPalettes.map((palette, idx) => (
        <div key={palette.id || idx} className="saved-palette">
          {palette.hexValues.map((color, i) => (
            <div
              key={i}
              className="color-block"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          <p><strong>Mood:</strong> {palette.mood}</p>
          <p><strong>Type:</strong> {palette.paletteType}</p>
        </div>
      ))}
    </div>
  );
}