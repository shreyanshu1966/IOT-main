import React from 'react';
import { Minus, Plus, X } from 'lucide-react';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div className="group relative flex items-center gap-4 p-4 backdrop-blur-lg bg-gray-800/30 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1">
      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10" />
      
      {/* Image */}
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-700 group-hover:border-blue-500 transition-colors">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              {item.name}
            </h3>
          </div>
          <button
            onClick={() => removeFromCart(item._id)}
            className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
              disabled={item.quantity <= 1}
              className="p-1.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus size={16} className="text-white" />
            </button>
            <span className="w-8 text-center font-medium text-gray-200">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              className="p-1.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all"
            >
              <Plus size={16} className="text-white" />
            </button>
          </div>
          <p className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
            ₹{item.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

