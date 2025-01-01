import React from "react";

const Cart = ({ cart, onCheckout }) => (
  <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-80">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Cart</h2>
    {cart.length === 0 ? (
      <p className="text-gray-500">Your cart is empty</p>
    ) : (
      cart.map((item) => (
        <p key={item.id} className="text-gray-700">
          {item.name} - {item.quantity} x ${item.price.toFixed(2)}
        </p>
      ))
    )}
    <button
      onClick={onCheckout}
      disabled={cart.length === 0}
      className={`mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors ${
        cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      Proceed to Checkout
    </button>
  </div>
);

export default Cart;
