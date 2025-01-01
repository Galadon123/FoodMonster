import React from "react";

const FoodCard = ({ food, onAdd }) => (
  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    {/* Food Image */}
    <div className="relative group">
      <img
        src="/images/2.jpeg" // Replace with actual food image if available
        alt={food.name}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    {/* Food Details */}
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
      <p className="text-sm text-gray-500 mt-1">
        A delicious and savory dish to satisfy your cravings.
      </p>
      <p className="text-xl font-bold text-green-600 mt-2">${food.price.toFixed(2)}</p>
      <button
        onClick={() => onAdd(food)}
        className="mt-4 w-full py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  </div>
);

export default FoodCard;
