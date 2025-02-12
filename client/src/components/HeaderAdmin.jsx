import React, { useContext } from 'react';
import { AppContent } from '../context/AppContext';
import { assets } from '../assets/assets';
import { GiSyringe } from 'react-icons/gi'; // Importa el ícono de la jeringa

export const HeaderAdmin = () => {
  const { userData } = useContext(AppContent);

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      {userData ? (
        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
          {/* Mostrar la primera letra del nombre del usuario */}
          {userData.name.charAt(0).toUpperCase()}
        </div>
      ) : null}
      
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
        Hola {userData ? userData.name : 'Admin'} !
        <img 
          className='w-8 aspect-square' 
          src={assets.hand_wave} 
          alt='Hand waving emoji' 
        />
      </h1>

      <h2 className='text-3xl sm:text-5xl font-semibold mb-4 animate-float'>
        Welcome System Vaccine
      </h2>

      <div className='flex items-center gap-2 mb-4'>
        <GiSyringe size={30} color="#4A90E2" /> {/* Ícono de vacuna */}
        <p className='text-xl'>Vacunas para tu compañero canino</p>
      </div>

      <p className='mb-8 max-w-lg animate-slide-fade'>
        ¡Cudiado para tu compañero canino!
      </p>
    </div>
  );
};

export default HeaderAdmin;
