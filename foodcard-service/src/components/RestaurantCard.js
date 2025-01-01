import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => (
  <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    {/* Restaurant Image */}
    <div className="relative group">
      <img
        src="/images/download.png"
        alt={restaurant.name}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* Offer Badges */}
      {/* <div className="absolute top-2 left-2 flex flex-col space-y-2">
        <span className="bg-pink-500 text-white text-xs font-semibold py-1 px-2 rounded-full">
          Welcome gift: free delivery
        </span>
        <span className="bg-pink-500 text-white text-xs font-semibold py-1 px-2 rounded-full">
          20% off: brac100
        </span>
      </div> */}
    </div>

    {/* Restaurant Details */}
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800">{restaurant.name}</h3>
      <p className="text-sm text-gray-500 mt-2">Cuisine Type</p>
      <Link
        to={`/restaurant/${restaurant.id}`}
        className="mt-4 inline-block text-green-500 hover:text-green-600 font-medium"
      >
        View Menu
      </Link>
    </div>
  </div>
);

export default RestaurantCard;
