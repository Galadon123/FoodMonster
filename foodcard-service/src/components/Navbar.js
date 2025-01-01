import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          FoodMonster
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-green-500 font-medium">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-green-500 font-medium">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-green-500 font-medium">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-gray-800 focus:outline-none"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu.classList.toggle("hidden");
            }}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="hidden bg-white md:hidden border-t border-gray-200"
      >
        <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-green-50">
          Home
        </Link>
        <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-green-50">
          About
        </Link>
        <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-green-50">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
