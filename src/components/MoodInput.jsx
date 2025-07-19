// MoodInput.jsx - input field and submit logic for generating a palette based on mood

import React, { useState } from "react";
import PaletteDisplay from "./PaletteDisplay";

export default function MoodInput() {
  // State to track live user input
  const [mood, setMood] = useState("");

  // State to track submitted mood (used for triggering palette generation)
  const [submittedMood, setSubmittedMood] = useState("");

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    if (mood.trim() === "") return; // Avoid submission if input is empty
    setSubmittedMood(mood.trim());  // Save trimmed mood for PaletteDisplay
  };

  return (
    <div>
      {/* Form to capture user mood input */}
      <form onSubmit={handleSubmit}>
        <label>
          Enter a mood (e.g. serene, electric, nostalgic):
          <input
            type="text"
            value={mood} // Live mood input value
            onChange={(e) => setMood(e.target.value)} // Update mood as user types
            placeholder="Type your mood..."
            style={{ marginLeft: 10 }} // Small spacing between label and input
          />
        </label>

        <button type="submit" style={{ marginLeft: 10 }}>
          Generate Palette
        </button>
      </form>

      {/* Conditionally render the palette display if a mood has been submitted */}
      {submittedMood && <PaletteDisplay mood={submittedMood} />}
    </div>
  );
}