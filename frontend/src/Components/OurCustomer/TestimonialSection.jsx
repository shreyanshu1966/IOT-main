// import React, { useState, useEffect } from 'react';
// import { FaStar } from 'react-icons/fa';
// import axios from 'axios';

// const VITE_API_URL = import.meta.env.VITE_API_URL;

// const TestimonialSection = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`${VITE_API_URL}/api/testimonials`);
//         setTestimonials(response.data);
//       } catch (error) {
//         console.error('Error fetching testimonials:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTestimonials();
//   }, []);

//   return (
//     <section className="bg-gray-50 py-12">
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="text-3xl font-bold mb-8 text-center">
//           Customer Reviews
//         </h2>
        
//         {isLoading ? (
//           <div className="text-center">Loading...</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {testimonials
//               .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//               .map((testimonial) => (
//               <div key={testimonial._id} 
//                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-xl font-semibold">{testimonial.name}</h3>
//                   <div className="flex">
//                     {[...Array(5)].map((_, i) => (
//                       <span key={i} 
//                             className={`text-xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <p className="text-gray-600">{testimonial.review}</p>
//                 <p className="text-sm text-gray-400 mt-4">
//                   {new Date(testimonial.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default TestimonialSection;



// import React, { useState, useEffect, useRef } from "react";
// import { FaStar } from "react-icons/fa";
// import axios from "axios";

// const VITE_API_URL = import.meta.env.VITE_API_URL;

// const TestimonialSection = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const sliderRef = useRef(null);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`${VITE_API_URL}/api/testimonials`);
//         setTestimonials(response.data);
//       } catch (error) {
//         console.error("Error fetching testimonials:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTestimonials();
//   }, []);

//   // Auto-slide effect
//   useEffect(() => {
//     if (!isPaused) {
//       const interval = setInterval(() => {
//         if (sliderRef.current) {
//           sliderRef.current.scrollLeft += 2; // Adjust speed if needed
//           if (
//             sliderRef.current.scrollLeft + sliderRef.current.clientWidth >=
//             sliderRef.current.scrollWidth
//           ) {
//             sliderRef.current.scrollLeft = 0; // Loop back to start
//           }
//         }
//       }, 30); // Adjust speed of scroll
//       return () => clearInterval(interval);
//     }
//   }, [isPaused]);

//   return (
//     <section className="relative bg-black py-16 px-6 sm:px-12 overflow-hidden">
//       {/* Neon Glow Background */}
//       <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-blue-900 to-cyan-600 opacity-20 blur-3xl"></div>

//       <div className="max-w-6xl mx-auto relative z-10">
//         <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 sm:text-5xl">
//           Customer Reviews
//         </h2>
//         <p className="text-lg text-gray-400 text-center mt-4">
//           Hear what our customers have to say
//         </p>

//         {isLoading ? (
//           <div className="text-center text-white mt-8">Loading...</div>
//         ) : (
//           <div
//             className="flex space-x-6 overflow-x-hidden scroll-smooth py-10"
//             ref={sliderRef}
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//           >
//             {testimonials
//               .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//               .map((testimonial) => (
//                 <div
//                   key={testimonial._id}
//                   className="group min-w-[320px] sm:min-w-[400px] bg-white/5 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:border-white/40"
//                 >
//                   {/* Glowing effect */}
//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

//                   <h3 className="text-2xl font-semibold text-white mb-4">
//                     {testimonial.name}
//                   </h3>

//                   {/* Star Ratings */}
//                   <div className="flex mb-4">
//                     {[...Array(5)].map((_, i) => (
//                       <FaStar
//                         key={i}
//                         className={`text-xl transition-all ${
//                           i < testimonial.rating
//                             ? "text-yellow-400 group-hover:text-yellow-300"
//                             : "text-gray-500"
//                         }`}
//                       />
//                     ))}
//                   </div>

//                   {/* Review Text */}
//                   <p className="text-gray-300">{testimonial.review}</p>

//                   {/* Date */}
//                   <p className="text-sm text-gray-500 mt-6">
//                     {new Date(testimonial.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default TestimonialSection;




// import React, { useState, useEffect, useRef } from "react";
// import { Star } from "lucide-react"; // Switching to lucide-react as per project setup
// import axios from "axios";

// const VITE_API_URL = import.meta.env.VITE_API_URL;

// const TestimonialSection = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`${VITE_API_URL}/api/testimonials`);
//         setTestimonials(response.data);
//       } catch (error) {
//         console.error("Error fetching testimonials:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTestimonials();
//   }, []);

//   // Smooth auto-scroll with transform
//   useEffect(() => {
//     if (!isPaused && testimonials.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentIndex((prevIndex) => 
//           prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
//         );
//       }, 5000); // Change slide every 5 seconds

//       return () => clearInterval(interval);
//     }
//   }, [isPaused, testimonials.length]);

//   const visibleTestimonials = testimonials
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//   return (
//     <section className="relative bg-black py-16 px-6 sm:px-12 overflow-hidden">
//       {/* Neon Glow Background */}
//       <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-blue-900 to-cyan-600 opacity-20 blur-3xl"></div>

//       <div className="max-w-6xl mx-auto relative z-10">
//         <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 sm:text-5xl">
//           Customer Reviews
//         </h2>
//         <p className="text-lg text-gray-400 text-center mt-4">
//           Hear what our customers have to say
//         </p>

//         {isLoading ? (
//           <div className="text-center text-white mt-8">Loading...</div>
//         ) : (
//           <div 
//             className="relative mt-12 h-[400px] overflow-hidden"
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//           >
//             <div 
//               className="flex transition-transform duration-700 ease-in-out absolute w-full h-full"
//               style={{
//                 transform: `translateX(-${currentIndex * 100}%)`,
//               }}
//             >
//               {visibleTestimonials.map((testimonial, index) => (
//                 <div
//                   key={testimonial._id}
//                   className="w-full flex-shrink-0 px-4"
//                 >
//                   <div className="h-full group bg-white/5 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-white/40">
//                     {/* Glowing effect */}
//                     <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

//                     <h3 className="text-2xl font-semibold text-white mb-4">
//                       {testimonial.name}
//                     </h3>

//                     {/* Star Ratings */}
//                     <div className="flex mb-4">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-5 h-5 transition-all ${
//                             i < testimonial.rating
//                               ? "text-yellow-400 fill-yellow-400 group-hover:text-yellow-300 group-hover:fill-yellow-300"
//                               : "text-gray-500"
//                           }`}
//                         />
//                       ))}
//                     </div>

//                     {/* Review Text */}
//                     <p className="text-gray-300 line-clamp-4">{testimonial.review}</p>

//                     {/* Date */}
//                     <p className="text-sm text-gray-500 mt-6">
//                       {new Date(testimonial.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Navigation Dots */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//               {visibleTestimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`w-2 h-2 rounded-full transition-all ${
//                     currentIndex === index 
//                       ? "bg-white w-4" 
//                       : "bg-white/50 hover:bg-white/75"
//                   }`}
//                   onClick={() => setCurrentIndex(index)}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ;



import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react"; // Importing icons
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${VITE_API_URL}/api/testimonials`);
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const visibleTestimonials = testimonials.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? visibleTestimonials.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === visibleTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="relative bg-black py-16 px-6 sm:px-12 overflow-hidden">
      {/* Neon Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-blue-900 to-cyan-600 opacity-20 blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 sm:text-5xl">
          Customer Reviews
        </h2>
        <p className="text-lg text-gray-400 text-center mt-4">
          Hear what our customers have to say
        </p>

        {isLoading ? (
          <div className="text-center text-white mt-8">Loading...</div>
        ) : (
          <div className="relative mt-12 h-[400px] overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out w-full"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {visibleTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial._id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="h-full group bg-white/5 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-white/40">
                    {/* Glowing effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {testimonial.name}
                    </h3>

                    {/* Star Ratings */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 transition-all ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400 group-hover:text-yellow-300 group-hover:fill-yellow-300"
                              : "text-gray-500"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-300 line-clamp-4">
                      {testimonial.review}
                    </p>

                    {/* Date */}
                    <p className="text-sm text-gray-500 mt-6">
                      {new Date(testimonial.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Previous Button */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800 text-white p-3 rounded-full transition"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800 text-white p-3 rounded-full transition"
              onClick={nextSlide}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialSection;


