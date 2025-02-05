// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ImageIcon } from "lucide-react"; // For fallback icon
// const apiUrl = import.meta.env.VITE_API_URL;

// const OurCustomer = () => {
//   const [clients, setClients] = useState([]);

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/api/clients`);
//         setClients(response.data);
//       } catch (error) {
//         console.error("Error fetching clients:", error);
//       }
//     };

//     fetchClients();
//   }, []);

//   return (
//     <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center">
//           <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//             Our Clients
//           </h2>
//           <p className="mt-3 text-lg text-gray-600">
//             Meet the clients who trust our work
//           </p>
//         </div>

//         <div className="mt-12">
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
//             {clients.map((client) => (
//               <div
//                 key={client.name}
//                 className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center text-center"
//               >
//                 <div className="relative w-24 h-24 overflow-hidden flex items-center justify-center">
//                   {client.logo ? (
//                     <img
//                       src={client.logo}
//                       alt={client.name}
//                       className="object-contain w-full h-full"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = null; // Placeholder
//                       }}
//                     />
//                   ) : (
//                     <ImageIcon className="w-12 h-12 text-gray-400" />
//                   )}
//                 </div>
//                 <p className="mt-4 text-base font-medium text-gray-700">
//                   {client.name}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OurCustomer;



// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { ImageIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// const apiUrl = import.meta.env.VITE_API_URL;

// const OurCustomer = () => {
//   const [clients, setClients] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   const itemsPerSlide = 4;
//   const totalSlides = Math.ceil(clients.length / itemsPerSlide);

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/api/clients`);
//         setClients(response.data);
//       } catch (error) {
//         console.error("Error fetching clients:", error);
//       }
//     };

//     fetchClients();
//   }, []);

//   const nextSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev + 1) % totalSlides);
//   }, [totalSlides]);

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
//   };

//   // Auto-slide effect
//   useEffect(() => {
//     if (!isHovered && clients.length > 0) {
//       const timer = setInterval(nextSlide, 3000);
//       return () => clearInterval(timer);
//     }
//   }, [nextSlide, isHovered, clients.length]);

//   const getVisibleClients = () => {
//     const start = currentSlide * itemsPerSlide;
//     return clients.slice(start, start + itemsPerSlide);
//   };

//   return (
//     <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       <div className="max-w-7xl mx-auto relative">
//         <div className="text-center mb-16">
//           <div className="inline-block">
//             <h2 className="text-4xl font-bold text-white sm:text-5xl relative">
//               <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
//                 Trusted by Industry Leaders
//               </span>
//               <div className="absolute -inset-1 blur-xl bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 -z-10" />
//             </h2>
//           </div>
//           <p className="mt-4 text-xl text-gray-400">
//             Powering the future of technology
//           </p>
//         </div>

//         <div 
//           className="relative"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {/* Navigation buttons */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/5 backdrop-blur-sm p-2 rounded-full hover:bg-white/10 transition-all border border-white/10"
//             aria-label="Previous slide"
//           >
//             <ChevronLeftIcon className="w-6 h-6 text-white" />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/5 backdrop-blur-sm p-2 rounded-full hover:bg-white/10 transition-all border border-white/10"
//             aria-label="Next slide"
//           >
//             <ChevronRightIcon className="w-6 h-6 text-white" />
//           </button>

//           {/* Clients grid */}
//           <div className="overflow-hidden px-4">
//             <div 
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-transform duration-500 ease-out"
//               style={{
//                 transform: `translateX(-${currentSlide * 100}%)`,
//               }}
//             >
//               {getVisibleClients().map((client, index) => (
//                 <div
//                   key={client.name + index}
//                   className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10"
//                 >
//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
//                   <div className="relative">
//                     <div className="h-32 flex items-center justify-center mb-6 bg-white/5 rounded-xl p-4">
//                       {client.logo ? (
//                         <img
//                           src={client.logo}
//                           alt={client.name}
//                           className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-110"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = null;
//                           }}
//                         />
//                       ) : (
//                         <ImageIcon className="w-16 h-16 text-gray-400" />
//                       )}
//                     </div>
//                     <h3 className="text-xl font-medium text-white text-center group-hover:text-cyan-400 transition-colors">
//                       {client.name}
//                     </h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Slide indicators */}
//           <div className="flex justify-center mt-8 gap-2">
//             {Array.from({ length: totalSlides }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`h-1 rounded-full transition-all duration-300 ${
//                   currentSlide === index
//                     ? "w-8 bg-gradient-to-r from-cyan-400 to-blue-500"
//                     : "w-2 bg-white/20 hover:bg-white/30"
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OurCustomer;


// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { ImageIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// const apiUrl = import.meta.env.VITE_API_URL;

// const OurCustomer = () => {
//   const [clients, setClients] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   const itemsPerSlide = 4;
//   const totalSlides = Math.ceil(clients.length / itemsPerSlide);

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/api/clients`);
//         setClients(response.data);
//       } catch (error) {
//         console.error("Error fetching clients:", error);
//       }
//     };

//     fetchClients();
//   }, []);

//   const nextSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev + 1) % totalSlides);
//   }, [totalSlides]);

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
//   };

//   // Auto-slide effect
//   useEffect(() => {
//     if (!isHovered && clients.length > 0) {
//       const timer = setInterval(nextSlide, 3000);
//       return () => clearInterval(timer);
//     }
//   }, [nextSlide, isHovered, clients.length]);

//   return (
//     <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       <div className="max-w-7xl mx-auto relative">
//         <div className="text-center mb-16">
//           <div className="inline-block">
//             <h2 className="text-4xl font-bold text-white sm:text-5xl relative">
//               <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
//                 Trusted by Industry Leaders
//               </span>
//               <div className="absolute -inset-1 blur-xl bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 -z-10" />
//             </h2>
//           </div>
//           <p className="mt-4 text-xl text-gray-400">
//             Powering the future of technology
//           </p>
//         </div>

//         <div 
//           className="relative"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {/* Navigation buttons */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/5 backdrop-blur-sm p-2 rounded-full hover:bg-white/10 transition-all border border-white/10"
//             aria-label="Previous slide"
//           >
//             <ChevronLeftIcon className="w-6 h-6 text-white" />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/5 backdrop-blur-sm p-2 rounded-full hover:bg-white/10 transition-all border border-white/10"
//             aria-label="Next slide"
//           >
//             <ChevronRightIcon className="w-6 h-6 text-white" />
//           </button>

//           {/* Clients slider */}
//           <div className="overflow-hidden">
//             <div 
//               className="flex transition-transform duration-500 ease-out"
//               style={{
//                 transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
//                 width: `${clients.length * (100 / itemsPerSlide)}%`,
//               }}
//             >
//               {clients.map((client, index) => (
//                 <div
//                   key={client.name + index}
//                   className="px-4"
//                   style={{ width: `${100 / clients.length}%` }}
//                 >
//                   <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10 h-full">
//                     <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
//                     <div className="relative">
//                       <div className="h-32 flex items-center justify-center mb-6 bg-white/5 rounded-xl p-4">
//                         {client.logo ? (
//                           <img
//                             src={client.logo}
//                             alt={client.name}
//                             className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-110"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = null;
//                             }}
//                           />
//                         ) : (
//                           <ImageIcon className="w-16 h-16 text-gray-400" />
//                         )}
//                       </div>
//                       <h3 className="text-xl font-medium text-white text-center group-hover:text-cyan-400 transition-colors">
//                         {client.name}
//                       </h3>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Slide indicators */}
//           <div className="flex justify-center mt-8 gap-2">
//             {Array.from({ length: totalSlides }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`h-1 rounded-full transition-all duration-300 ${
//                   currentSlide === index
//                     ? "w-8 bg-gradient-to-r from-cyan-400 to-blue-500"
//                     : "w-2 bg-white/20 hover:bg-white/30"
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OurCustomer;


// import React, { useEffect, useRef } from "react";
// import axios from "axios";

// const apiUrl = import.meta.env.VITE_API_URL;

// const OurCustomer = () => {
//   const [clients, setClients] = React.useState([]);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/api/clients`);
//         setClients(response.data);
//       } catch (error) {
//         console.error("Error fetching clients:", error);
//       }
//     };

//     fetchClients();
//   }, []);

//   // Start infinite scrolling
//   useEffect(() => {
//     if (scrollRef.current) {
//       let scrollAmount = 0;
//       const scrollSpeed = 0.5; // Adjust for faster/slower movement

//       const scroll = () => {
//         if (scrollRef.current) {
//           scrollAmount += scrollSpeed;
//           scrollRef.current.style.transform = `translateX(-${scrollAmount}px)`;

//           // Reset when logos move completely out of view
//           if (scrollAmount >= scrollRef.current.clientWidth / 2) {
//             scrollAmount = 0;
//           }
//         }
//         requestAnimationFrame(scroll);
//       };

//       scroll();
//     }
//   }, [clients]);

//   return (
//     <div className="bg-black py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       <div className="max-w-7xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 sm:text-5xl">
//           Our Trusted Clients
//         </h2>
//         <p className="mt-4 text-lg text-gray-400">
//           Innovating the future with industry leaders
//         </p>
//       </div>

//       {/* Scrolling Container */}
//       <div className="relative mt-8 overflow-hidden w-full">
//         <div className="flex space-x-12" ref={scrollRef}>
//           {[...clients, ...clients].map((client, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center text-white bg-white/5 backdrop-blur-md px-6 py-4 rounded-lg shadow-md"
//             >
//               <img
//                 src={client.logo}
//                 alt={client.name}
//                 className="h-32 w-32 object-contain"
//                 onError={(e) => (e.target.style.display = "none")}
//               />
//               <p className="mt-2 text-sm font-medium">{client.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OurCustomer;


import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

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
                src={client.logo}
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
