import React from 'react';
import logo from '../assets/logo.png';
import profile from '../assets/profile.png';
import { FiSearch } from 'react-icons/fi'; // Icono de lupa

export const Navbar = () => {
  return (
    <div className="max-padd-container flex justify-between items-center py-4 px-6 bg-gray-800 text-white">
      {/* Logo */}
      <img src={logo} alt="logoImg" height={50} width={50} className="sm:h-12 sm:w-12" />

      {/* Menú hamburguesa para pantallas pequeñas */}
      <div className="md:hidden flex items-center space-x-4">
        <div className="text-2xl cursor-pointer">
          {/* Aquí podrías agregar un ícono de menú hamburguesa si lo deseas */}
        </div>
      </div>
    </div>
  );
};
