import React from "react";
import { Link } from "react-router-dom";
import logo2 from "/logo2.jpg";

const AboutTestimonial = () => {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white text-center px-6 overflow-hidden">
      {/* Floating Blur Effects for Futuristic Feel */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-cyan-500 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 opacity-20 blur-3xl"></div>

      {/* Logo with White Background */}
      <div className="bg-white p-3 rounded-lg shadow-lg">
        <img src={logo2} alt="Company Logo" className="w-36 h-36 object-contain" />
      </div>

      {/* Glassmorphism Card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-3xl shadow-lg transition-transform duration-300 hover:scale-105 mt-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-cyan-400 whitespace-nowrap">
          INTUITIVE ROBOTICS OPC PVT. LTD.
        </h1>
        <p className="text-lg text-gray-300 mt-4 italic">
          &quot;Bridging the gap between cutting-edge technology and industry applications&quot;
        </p>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Specializing in AI, IoT, and Robotics to solve real-world challenges across various sectors.
        </p>

        {/* Button */}
        <Link
          to="/about"
          className="mt-6 inline-block px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-all shadow-md hover:shadow-cyan-500/50"
        >
          More About Us →
        </Link>
      </div>
    </section>
  );
};

export default AboutTestimonial;
