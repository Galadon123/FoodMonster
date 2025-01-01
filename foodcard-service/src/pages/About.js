import React from "react";
import Navbar from "../components/Navbar";
const About = () => {
  return (
   <div>
    <Navbar />
    <div className="min-h-screen bg-gray-100 py-12 px-4 mt-20">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 leading-relaxed">
          Welcome to FoodMonster! We are passionate about connecting food lovers with the best restaurants in town. 
          Our mission is to make food ordering and delivery convenient, fast, and enjoyable.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          Whether you're craving a classic burger, gourmet pizza, or exotic cuisines, we've got you covered. 
          Explore our wide selection of restaurants and enjoy delicious food delivered straight to your doorstep.
        </p>
      </div>
    </div>
    </div>
  );
};

export default About;
