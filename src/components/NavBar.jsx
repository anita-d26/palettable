// NavBar.jsx - navigation bar

import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="nav-content">
        <Link to="/" className="nav-logo">Palettable</Link>
        </div>

        <ul className="navbar-menu">
        <li><Link to="/about" className="navbar-link">About</Link></li>
        <li><Link to="/profile" className="navbar-link">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;