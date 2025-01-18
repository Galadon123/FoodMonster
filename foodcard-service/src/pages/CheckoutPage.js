import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext); // Fetch user details from AuthContext
  const cart = location.state?.cart || [];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } }); // Redirect to login page
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) {
    return null; // Prevent rendering if the user is being redirected
  }

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:3001/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: user?.name, // Dynamically fetch user's name
          email: user?.email, // Dynamically fetch user's email
          foodItems: cart.map((item) => item.name),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(`Order placed successfully! Order ID: ${result.orderId}`);
        navigate("/"); // Redirect to homepage or orders page
      } else {
        alert(`Failed to place order: ${result.error}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 mt-20">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.quantity} x ${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <div className="flex justify-between">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
