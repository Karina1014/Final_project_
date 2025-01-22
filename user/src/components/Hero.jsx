import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper
import "swiper/css"; // Swiper styles
import "swiper/css/effect-fade"; // Fade effect styles
import { EffectFade, Autoplay, Navigation } from "swiper/modules"; // Import modules
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import arrow icons
import { assets } from "../assets/assets"; // Ensure correct path to your images
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from 'react-icons/fi'; // Importa el ícono de flecha de React Icons

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div id='home' className="relative w-full">
      {/* Swiper background with adjustable height */}
      <Swiper
        modules={[EffectFade, Autoplay, Navigation]} // Ensure Navigation module is included
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        navigation={{
          nextEl: ".tp-rightarrow", // Right arrow button
          prevEl: ".tp-leftarrow",  // Left arrow button
        }}
        className="w-full h-[50vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] relative" // Adjustable height for different screen sizes
      >
        <SwiperSlide>
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={assets.background1}
              alt="Background 1"
              className="w-full h-full object-cover transform transition-all duration-700 ease-out zoom-image"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={assets.background3}
              alt="Background 2"
              className="w-full h-full object-cover transform transition-all duration-700 ease-out zoom-image"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={assets.background2}
              alt="Background 3"
              className="w-full h-full object-cover transform transition-all duration-700 ease-out zoom-image"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Dark overlay layer to improve text visibility */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Welcome text and button */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center text-white px-4 sm:px-8 md:px-12 lg:px-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">Welcome to the Vaccination System</h2>
        <p className="text-lg sm:text-xl lg:text-2xl mb-6">Discover our vaccination services and options. Stay protected and informed!</p>

        <button
          onClick={() => navigate('/login')}
          className="inline-flex items-center justify-center bg-[#0C9AD1] text-white py-3 px-8 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-[#0A88B2] hover:scale-105"
        >
          <span>Sign In</span> {/* Texto actualizado a "Sign In" */}
          <FiArrowRight size={24} /> {/* Usa el ícono de flecha de React Icons */}
        </button>
      </div>

       

      {/* Left arrow button with React icon */}
      <div className="tp-leftarrow tp-arrows absolute top-1/2 left-4 sm:left-8 md:left-12 transform -translate-y-1/2 z-30 cursor-pointer transition-all duration-300 ease-in-out rounded-full bg-[#0C9AD1] bg-opacity-70 p-4 shadow-lg hover:bg-opacity-100 hover:scale-105 animate-pulse">
        <div className="tp-title-wrap">
          <FaChevronLeft size={30} color="white" />
        </div>
      </div>

      {/* Right arrow button with React icon */}
      <div className="tp-rightarrow tp-arrows absolute top-1/2 right-4 sm:right-8 md:right-12 transform -translate-y-1/2 z-30 cursor-pointer transition-all duration-300 ease-in-out rounded-full bg-[#0C9AD1] bg-opacity-70 p-4 shadow-lg hover:bg-opacity-100 hover:scale-105 animate-pulse">
        <div className="tp-title-wrap">
          <FaChevronRight size={30} color="white" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
