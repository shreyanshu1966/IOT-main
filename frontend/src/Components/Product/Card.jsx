import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const Card = ({ product, addToCart }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const token = localStorage.getItem('token');
  let userRole = '';
  
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userRole = decodedToken.role || '';
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    // Check if the user is logged in
    if (!token) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    addToCart(product); // Proceed with adding to cart if logged in
  };

  return (
    <motion.div
      className="group relative bg-gray-800 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-700 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 border border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

      {/* Image Container */}
      <div className="relative h-60 overflow-hidden rounded-t-2xl">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500"
          animate={{ scale: isHovered ? 1.05 : 1 }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 flex-grow">
        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mt-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-gray-300 text-sm">{product.rating || '4.5'}</span>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mt-2 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold text-white">₹{product.price.toFixed(2)}</p>

          {/* Conditionally render the Add to Cart button */}
          {userRole !== 'admin' && (
            <motion.button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Add</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
