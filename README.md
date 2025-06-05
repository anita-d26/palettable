# Palettable

Palettable is a mood-based color palette generator that helps users explore and create beautiful color palettes based on their mood. Whether for designer or just people looking for inspiration, Palettable turns feelings into harmonious color schemes.


## Features

- Generate color palettes based on user-input moods (e.g., happy, cozy, dreamy)
- Choose from different color harmony styles (monochromatic, analogic, complement, triad)
- Generate random palettes with one click
- Hover over color to see name and hex code
- Click to copy color hex codes
- Save favorite palettes to a profile page


## How It Works

Palettable maps moods to base colors using a custom `moodColorMap`. It then generates a harmonious palette based on the selected style using the [TheColorAPI](https://www.thecolorapi.com/). Users can choose a mood, select a harmony type, and instantly see a matching color scheme.


## Tools

- Frontend: React (Vite)
- Routing: React Router DOM
- Styling: Bootstrap + Custom CSS
- Database Storage: Firebase
- Color API: [TheColorAPI](https://www.thecolorapi.com/)
- Deployment: Vercel


## Project Structure
palettable/
├── public/
├── src/
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── components/
│   │   ├── ColorBlock.jsx
│   │   ├── MoodInput.jsx
│   │   ├── NavBar.jsx
│   │   ├── PaletteDisplay.jsx
│   │   └── PaletteType.jsx
│   │
│   ├── pages/
│   │   ├── AboutPage.jsx
│   │   └── HomePage.jsx
│   │   └── ProfilePage.jsx
│   │
│   ├── styles/
│   │   ├── ColorBlock.jsx
│   │   ├── MoodInput.jsx
│   │   ├── NavBar.jsx
│   │   ├── PaletteDisplay.jsx
│   │   └── PaletteType.jsx
│   │
│   ├── utils/
│   │   ├── getRandomPalette.js
│   │   └── MoodToPalette.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js


## Getting Started

1. Clone the repo
    git clone https://github.com/yourusername/palettable.git

2. cd palettable

3. Install dependencies
    npm install

4. Run the development server
    npm run dev
    Visit http://localhost:5173 to view the app!


## Acknowledgments

Anita Daniel
Created for HCDE 438 