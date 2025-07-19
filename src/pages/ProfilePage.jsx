// ProfilePage.jsx - Displays a list of palettes saved by the user

import React, { useEffect, useState } from "react";
import { getPalettes, clearAllPalettes } from "../utils/firebaseUtils"; // Firebase utility functions

export default function Profile() {
  // State to store fetched palettes and loading status
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetches all saved palettes from Firebase
  const fetchPalettes = async () => {
    const palettes = await getPalettes();
    setSavedPalettes(palettes);
    setLoading(false);
  };

  // Run fetchPalettes once on component mount
  useEffect(() => {
    fetchPalettes();
  }, []);

  // Deletes all saved palettes (with confirmation)
  const clearAll = async () => {
    const confirm = window.confirm("Are you sure you want to delete all saved palettes?");
    if (!confirm) return;

    await clearAllPalettes();   // Clear palettes in Firebase
    await fetchPalettes();      // Refresh palette list in UI
  };

  // Show loading message while palettes are being fetched
  if (loading) return <p>Loading saved palettes...</p>;

  return (
    <div className="container">
      <h2>Saved Palettes</h2>

      {/* Button to clear all saved palettes */}
      <button onClick={clearAll}>Clear All</button>

      {/* Message when no palettes are saved */}
      {savedPalettes.length === 0 && <p>No saved palettes yet.</p>}

      {/* Render each saved palette */}
      {savedPalettes.map((palette, idx) => (
        <div key={palette.id || idx}>
          {/* Color swatches */}
          <div style={{ display: "flex", marginBottom: 8 }}>
            {Array.isArray(palette.hexValues) && palette.hexValues.map((color, i) => (
              <div
                key={i}
                title={color}
                style={{
                  backgroundColor: color,
                  width: 30,
                  height: 30,
                  marginRight: 5,
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </div>

          {/* Mood and palette type metadata */}
          {palette.mood && <p><strong>Mood:</strong> {palette.mood}</p>}
          {palette.paletteType && <p><strong>Style:</strong> {palette.paletteType}</p>}
        </div>
      ))}
    </div>
  );
}