// NavBar.jsx - navigation bar

import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#512d38] text-white shadow-md px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold tracking-wide hover:text-[#f4bfdb] transition-colors">
        Palettable
      </Link>

      <div className="space-x-4 hidden md:flex">
        <Link to="/" className="hover:text-[#f4bfdb] transition-colors">Home</Link>
        <Link to="/explore" className="hover:text-[#f4bfdb] transition-colors">Explore</Link>
      </div>

      <div className="md:hidden relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          ☰
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg z-10">
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-gray-200"
            >
              About
            </Link>
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-gray-200"
            >
              Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;