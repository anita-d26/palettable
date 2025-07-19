// ColorBlock.jsx - displays an individual color, shows name on hover, copies hex on click

import React, { useState } from "react";
import "../styles/ColorBlock.css";

export default function ColorBlock({ hex }) {
  // Holds the human-readable name of the color (e.g., "Sky Blue")
  const [colorName, setColorName] = useState("");

  // Tracks whether the color name has already been fetched to avoid redundant API calls
  const [hasFetched, setHasFetched] = useState(false);

  // Function to fetch the name of the color using TheColorAPI
  const fetchColorName = async () => {
    // If already fetched or name exists, do nothing
    if (hasFetched || colorName) return;

    setHasFetched(true); // Prevent future calls

    // Clean hex string (remove #)
    const cleanHex = hex.replace("#", "");

    try {
      // API request to get color details
      const res = await fetch(`https://www.thecolorapi.com/id?hex=${cleanHex}`);
      const data = await res.json();
      setColorName(data.name.value); // Store name from response
    } catch (err) {
      setColorName("Unknown"); // Fallback if request fails
    }
  };

  return (
    <div
      className="color-block-wrapper"
      onMouseEnter={fetchColorName} // Trigger API call on hover
      title="Click to copy"         // Tooltip for native browser hint
      onClick={() => navigator.clipboard.writeText(hex)} // Copy hex to clipboard
    >
      {/* Main colored square */}
      <div
        className="color-block"
        style={{ backgroundColor: hex }}
      />

      {/* Tooltip with color name and hex */}
      <div className="tooltip">
        <div>{colorName || "Loading..."}</div>
        <div>{hex}</div>
      </div>
    </div>
  );
}