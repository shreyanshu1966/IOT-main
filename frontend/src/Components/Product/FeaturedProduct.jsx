import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./Card"; // Ensure Card supports onClick or has a <Link>

const FeaturedProduct = ({ featuredProducts, addToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, featuredProducts.length - 1)
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <section className="relative bg-black py-16 px-6 sm:px-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-blue-900 to-cyan-600 opacity-30 blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 sm:text-5xl">
          Featured Products
        </h2>
        <p className="text-lg text-gray-400 text-center mt-4">
          Explore our top-rated products
        </p>

        {/* Slider Container */}
        <div className="relative mt-10">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex >= featuredProducts.length - 1}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Products Slider */}
          <div className="overflow-hidden px-4">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="w-full min-w-full sm:w-1/2 sm:min-w-[50%] md:w-1/3 md:min-w-[33.333333%] lg:w-1/4 lg:min-w-[25%] px-3"
                >
                  <Card product={product} addToCart={addToCart} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
