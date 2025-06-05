// ProfilePage.jsx - users saved palettes

import React, { useEffect, useState } from "react";
import { getPalettes, clearAllPalettes } from "../utils/firebaseUtils";

export default function Profile() {
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPalettes = async () => {
    const palettes = await getPalettes();
    setSavedPalettes(palettes);
    setLoading(false);
  };

  useEffect(() => {
    fetchPalettes();
  }, []);

  const clearAll = async () => {
    const confirm = window.confirm("Are you sure you want to delete all saved palettes?");
    if (!confirm) return;

    await clearAllPalettes();
    await fetchPalettes();
  };

  if (loading) return <p>Loading saved palettes...</p>;

  return (
    <div className="container">
      <h2>Saved Palettes</h2>
      <button onClick={clearAll}>Clear All</button>
      {savedPalettes.length === 0 && <p>No saved palettes yet.</p>}

      {savedPalettes.map((palette, idx) => (
        <div key={palette.id || idx}>
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
          {palette.mood && <p><strong>Mood:</strong> {palette.mood}</p>}
          {palette.paletteType && <p><strong>Style:</strong> {palette.paletteType}</p>}
        </div>
      ))}
    </div>
  );
}