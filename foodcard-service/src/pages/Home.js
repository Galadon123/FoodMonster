import React from "react";
import { restaurants } from "../data";
import RestaurantCard from "../components/RestaurantCard";
import Navbar from "../components/Navbar";

const Home = () => (
  <div>
    <Navbar />
    <div className="bg-gray-50 pb-8">
      {/* Hero Section */}
      <div className="relative bg-white shadow-md">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Food Delivery from Chittagong’s Best Restaurants
            </h1>
            <p className="text-gray-600">
              Enjoy delicious meals delivered straight to your doorstep. Explore
              a wide range of cuisines and offers.
            </p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <img
              src="/images/1.avif"
              alt="Hero Banner"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-600">
          <a href="/" className="hover:text-green-500">
            Homepage
          </a>{" "}
          &gt;{" "}
          <span className="font-medium text-gray-800">Chittagong</span>
        </nav>
      </div>

      {/* Restaurant Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">All Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Home;
