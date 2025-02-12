import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getImageUrl } from '../../utils/mediaUtils';

const apiUrl = import.meta.env.VITE_API_URL;

const OurCustomer = () => {
  const [clients, setClients] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/clients`);
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  // Auto-scrolling effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const speed = 0.5; // Adjust speed

    const animateScroll = () => {
      scrollAmount += speed;
      scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;

      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }

      requestAnimationFrame(animateScroll);
    };

    animateScroll();
  }, [clients]);

  return (
    <div className="bg-black py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 sm:text-5xl">
          Our Trusted Clients
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Innovating the future with industry leaders
        </p>
      </div>

      {/* Scrolling Container */}
      <div className="relative mt-8 overflow-hidden w-full">
        <div className="flex whitespace-nowrap" ref={scrollRef}>
          {/* Duplicate list for smooth infinite scrolling */}
          {[...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-white bg-white/10 backdrop-blur-md px-8 py-6 rounded-xl shadow-lg border border-white/20 mx-4 min-w-[200px] max-w-[200px]"
            >
              <img
                src={getImageUrl(client.logo)}
                alt={client.name}
                className="h-32 w-32 object-contain"
                onError={(e) => (e.target.style.display = "none")}
              />
              <p className="mt-3 text-lg font-semibold">{client.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurCustomer;
