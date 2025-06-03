// AboutPage.jsx - description about how tool works

const AboutPage = () => {
  return (
    <main className="min-h-screen px-6 py-12 bg-[#ffe9f3] text-[#512d38] flex flex-col items-center justify-start">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">About Palettable</h1>

        <p className="text-lg mb-6">
          Welcome to <strong>Palettable</strong> — your creative companion for
          generating beautiful color palettes inspired by moods and styles!
        </p>

        <p className="text-md mb-4">
          Palettable helps you explore colors in a fun and intuitive way.
          Whether you want to evoke a feeling, match a vibe, or just find fresh
          hues for your project, Palettable generates palettes that bring your
          ideas to life.
        </p>

        <p className="text-md mb-4">
          Just enter a mood—like <em>serene</em>, <em>electric</em>, or{" "}
          <em>cozy</em>—and Palettable will create a color palette that fits
          that feeling. You can also choose the palette style or “mode” to
          control how colors relate to each other.
        </p>

        <div className="text-left mb-6">
          <p className="text-md font-semibold mb-2">
            Palettable offers several popular color harmony styles, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-md">
            <li>
              <strong>Monochromatic:</strong> Different shades and tints of a
              single color — simple and harmonious.
            </li>
            <li>
              <strong>Analogic:</strong> Colors that sit next to each other on
              the color wheel — smooth and pleasing.
            </li>
            <li>
              <strong>Complement:</strong> Colors directly opposite on the
              wheel — high contrast and vibrant.
            </li>
            <li>
              <strong>Triad:</strong> Three evenly spaced colors around the
              wheel — balanced and dynamic.
            </li>
          </ul>
        </div>

        <p className="text-md">
          Whether you’re designing a website, wanting to get inspired, or just exploring
          color for fun, Palettable makes color discovery easy and colorful!
        </p>

      </div>
    </main>
  );
};

export default AboutPage;