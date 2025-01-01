import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { foods, restaurants } from "../data";
import FoodCard from "../components/FoodCard";
import Cart from "../components/Cart";

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const handleAddToCart = (food) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === food.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...food, quantity: 1 }];
      }
    });
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };

  const restaurant = restaurants.find((res) => res.id === parseInt(id, 10));

  return (
    <div className="px-4 py-8 bg-gray-50 min-h-screen">
      {/* Restaurant Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center">
          <img
            src="/images/download.png"
            alt={restaurant?.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-gray-800">{restaurant?.name}</h1>
            <p className="text-gray-600 mt-2">
              Explore the delicious menu and enjoy a wonderful dining experience!
            </p>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {foods[id]?.map((food) => (
          <FoodCard key={food.id} food={food} onAdd={handleAddToCart} />
        ))}
      </div>

      {/* Fixed Cart */}
      <Cart cart={cart} onCheckout={handleCheckout} />
    </div>
  );
};

export default Restaurant;
