// PaletteType.jsx - to select type of color palette

import React from "react";
import "../styles/PaletteType.css";

export default function PaletteType({ mode, setMode, modePreviewColors }) {
  return (
    <div className="palette-type-container">
      <label className="palette-type-label">Palette Style:</label>
      <div className="palette-type-list">
        {Object.keys(modePreviewColors).map((m) => (
          <div
            key={m}
            onClick={() => setMode(m)}
            className={`palette-type-item ${mode === m ? "active" : ""}`}
          >
            <div className="palette-type-name">{m}</div>
            <div className="color-preview">
              {modePreviewColors[m].map((color, i) => (
                <div
                  key={i}
                  className="color-square"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}