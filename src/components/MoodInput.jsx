// MoodInput.jsx - input for mood/description to generate palette

import React, { useState } from "react";
import MoodToPalette from "../utils/MoodToPalette";

export default function MoodInput() {
  const [mood, setMood] = useState("");
  const [submittedMood, setSubmittedMood] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood.trim() === "") return;
    setSubmittedMood(mood.trim());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a mood (e.g. serene, electric, nostalgic):
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="Type your mood..."
            style={{ marginLeft: 10 }}
          />
        </label>
        <button type="submit" style={{ marginLeft: 10 }}>
          Generate Palette
        </button>
      </form>

      {submittedMood && <MoodToPalette mood={submittedMood} />}
    </div>
  );
}