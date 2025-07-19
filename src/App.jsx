// App.jsx - Root component managing React Router routes and app layout

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";       // Navigation bar component visible on all pages
import HomePage from "./pages/HomePage";       // Main landing page with palette generation
import AboutPage from "./pages/AboutPage";     // About page explaining the app
import ProfilePage from './pages/ProfilePage'; // User profile page showing saved palettes
import './index.css';

function App() {
  return (
    // Wrap the entire app in React Router context for SPA navigation
    <Router>
      {/* Persistent navigation bar on top */}
      <NavBar />
      
      {/* Main content container */}
      <div className="container">
        {/* Route matching and rendering components based on URL */}
        <Routes>
          {/* Home page at root path */}
          <Route path="/" element={<HomePage />} />

          {/* About page at /about */}
          <Route path="/about" element={<AboutPage />} />

          {/* Profile page at /profile */}
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;