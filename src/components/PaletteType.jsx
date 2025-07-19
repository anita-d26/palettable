import "../styles/PaletteType.css";

export default function PaletteType({ mode, setMode, modePreviewColors, disabled }) {
  return (
    <div className="palette-type-container">
      {/* Label for the dropdown, linked for accessibility */}
      <label htmlFor="palette-type-select" className="palette-type-label">
        Palette Style:
      </label>

      {/* Dropdown menu to select palette harmony style */}
      <select
        id="palette-type-select"           // ID links label to this select
        className="palette-type-select"    // CSS class for styling
        value={mode}                      // Current selected palette mode
        onChange={(e) => setMode(e.target.value)}  // Update selected mode on change
        disabled={disabled}               // Disable dropdown if needed
      >
        {/* Generate an <option> for each palette mode available */}
        {Object.keys(modePreviewColors).map((m) => (
          <option key={m} value={m}>
            {/* Capitalize the first letter for display */}
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </option>
        ))}
      </select>

      {/* Optional preview of colors for the selected palette mode */}
      <div
        className="color-preview"
        style={{ marginTop: "12px", justifyContent: "flex-start" }} // slight spacing and left align
      >
        {/* Render small color squares showing the selected mode's colors */}
        {modePreviewColors[mode].map((color, i) => (
          <div
            key={i}
            className="color-square"
            style={{ backgroundColor: color }}  // dynamic color background
          />
        ))}
      </div>
    </div>
  );
}