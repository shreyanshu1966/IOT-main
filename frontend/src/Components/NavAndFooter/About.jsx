import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16 overflow-hidden">
      
      {/* Floating Neon Glows */}
      <div className="absolute top-10 left-10 w-60 h-60 bg-cyan-500 opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500 opacity-20 blur-3xl animate-pulse"></div>

      {/* Glassmorphism Card */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-4xl text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40">
        
        {/* Title */}
        <h2 className="text-4xl font-bold sm:text-5xl text-cyan-400 mb-6">
          About Us
        </h2>
        
        {/* Description */}
        <p className="text-lg text-gray-300 mb-4">
          Intuitive Robotics OPC Pvt. Ltd. is a pioneering technology company established in 2022, specializing in AI, IoT, and Robotics solutions.
        </p>
        <p className="text-gray-400">
          Our expertise spans Power Systems, Renewable Energy, Agriculture, and Healthcare. With collaborations with prestigious institutions and a team of specialists trained in Japan, we drive innovation across industries.
        </p>

        {/* What We Do Section */}
        <h3 className="text-2xl font-semibold mt-8 text-cyan-400">What We Do</h3>
        <ul className="text-gray-300 mt-4 space-y-2">
          <li>🔹 AI-driven & IoT-enabled product development</li>
          <li>🔹 Smart laboratory establishment</li>
          <li>🔹 IoT-based subscription monitoring services</li>
          <li>🔹 AI-powered data analytics</li>
        </ul>

        {/* Our Expertise Section */}
        <h3 className="text-2xl font-semibold mt-8 text-purple-400">Our Expertise</h3>
        <ul className="text-gray-300 mt-4 space-y-2">
          <li>🚀 Advanced Health Monitoring & Disease Detection</li>
          <li>⚙️ Industrial IoT & Smart Manufacturing</li>
          <li>🤖 Mobile Robotics & Autonomous Systems</li>
          <li>🏡 Smart Home & Energy Management Solutions</li>
        </ul>

        <p className="text-gray-300 mt-8">
          Join us in shaping the future of AI, IoT, and Robotics.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-all shadow-md hover:shadow-cyan-500/50"
        >
          Back to Home →
        </Link>
      </div>
    </section>
  );
};

export default About;
