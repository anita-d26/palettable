// ProfilePage.jsx - users saved palettes

import React, { useState, useEffect } from "react";

export default function Profile() {
  const [savedPalettes, setSavedPalettes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedPalettes"));
    if (saved && Array.isArray(saved)) {
      setSavedPalettes(saved);
    } else {
      setSavedPalettes([]);
    }
  }, []);

  const clearPalettes = () => {
    localStorage.removeItem("savedPalettes");
    setSavedPalettes([]);
  };


  if (!savedPalettes.length) {
    return <div>No saved palettes yet.</div>;
  }

  return (
    <div className="profile-page">
        <h2>Saved Palettes</h2>
        <button onClick={clearPalettes}>Clear All Saved Palettes</button>
        {savedPalettes.map((palette, idx) => (
        <div key={idx} className="saved-palette">
            {palette.map((color, i) => (
                <div
                key={i}
                className="color-block"
                style={{ backgroundColor: color }}
                title={color}
                />
            ))}
        </div>
        ))}
    </div>
  );
}