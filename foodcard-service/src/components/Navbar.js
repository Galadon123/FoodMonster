import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null); // Clear user data on logout
  };

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

          {isAuthenticated ? (
            <>
              {/* Show username if logged in */}
              <span className="text-gray-700 font-medium">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-500 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Show login and signup links if not logged in */}
              <Link to="/login" className="text-gray-700 hover:text-green-500 font-medium">
                Login
              </Link>
              <Link to="/signup" className="text-gray-700 hover:text-green-500 font-medium">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
