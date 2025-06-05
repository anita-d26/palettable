// ColorBlock.jsx - color identification on hover and copy hex to clipboard

import React, { useState } from "react";
import "../styles/ColorBlock.css";

export default function ColorBlock({ hex }) {
  const [colorName, setColorName] = useState("");

  const [hasFetched, setHasFetched] = useState(false);

  const fetchColorName = async () => {
    if (hasFetched || colorName) return;
    const cleanHex = hex.replace("#", "");
    try {
      const res = await fetch(`https://www.thecolorapi.com/id?hex=${cleanHex}`);
      const data = await res.json();
      setColorName(data.name.value);
      setHasFetched(true);
    } catch (err) {
      setColorName("Unknown");
      setHasFetched(true);
    }
  };

  return (
    <div
      className="color-block-wrapper"
      onMouseEnter={fetchColorName}
      title="Click to copy"
      onClick={() => navigator.clipboard.writeText(hex)}
    >
      <div
        className="color-block"
        style={{ backgroundColor: hex }}
      />
      <div className="tooltip">
        <div>{colorName || "Loading..."}</div>
        <div>{hex}</div>
      </div>
    </div>
  );
}