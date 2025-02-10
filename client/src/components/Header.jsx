import React, { useContext } from 'react';
import { AppContent } from '../context/AppContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom'; // Navegar Hook en enrutador

export const Header = () => {
  const { userData } = useContext(AppContent);
  const navigate = useNavigate();
  
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img 
        src={assets.header_img || '/default-image.jpg'} 
        alt='Header Illustration' 
        className='w-36 h-36 rounded-full mb-6' 
      />
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
        Hey {userData ? userData.name : 'Developer'} !
        <img 
          className='w-8 aspect-square' 
          src={assets.hand_wave} 
          alt='Hand waving emoji' 
        />
      </h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>
        Welcome to the Dog Vaccination System
    </h2>
    <p className='mb-8 max-w-md'>
        Let's get started with a quick guide on essential vaccines for your dog. With this information, your pet will stay protected and healthy.
    </p>
    <button
          onClick={() => navigate('/admin')}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'
        >
          Login
          <img src={assets.arrow_icon} alt="Flecha" />
        </button>
    </div>
  );
};

export default Header;