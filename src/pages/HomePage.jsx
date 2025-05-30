// HomePage.jsx - home page

import { useState } from "react";
import { savePalette } from "../utils/savePalette";

function Home() {
  const [mood, setMood] = useState("calm");
  const [description, setDescription] = useState("soft and relaxed");
  const [generatedColors, setGeneratedColors] = useState([
    "#512d38", "#b27092", "#f4bfdb", "#ffe9f3", "#87baab"
  ]);

  const handleSave = () => {
    savePalette(mood, description, generatedColors);
  };

  return (
    <div>
      <h1>Color Palette Generator</h1>
      {/* Inputs, Color Preview, etc. */}
      <button onClick={handleSave}>Save Palette</button>
    </div>
  );
}

export default Home;