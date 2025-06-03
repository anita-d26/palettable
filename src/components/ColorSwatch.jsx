// ColorSwatch.jsx

const ColorSwatch = ({ hex, index, onClick }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
  };

  return (
    <div
      className="flex flex-col items-center justify-between rounded-2xl shadow-md p-4 transition-transform transform hover:scale-105 cursor-pointer"
      style={{ backgroundColor: hex }}
      onClick={() => {
        copyToClipboard();
        onClick?.(hex, index);
      }}
    >
      <div className="text-white font-semibold text-lg drop-shadow-sm">{hex}</div>
      <span className="text-sm mt-2 text-white opacity-80">Click to copy</span>
    </div>
  );
};

export default ColorSwatch;