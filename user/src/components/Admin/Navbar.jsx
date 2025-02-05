import React from 'react';
import logo from '../../assets/vaccine.png';
import profile from '../../assets/profile.png';
import { FiSearch } from 'react-icons/fi'; // Icono de lupa

export const Navbar = () => {
  return (
    <div className="max-padd-container flex justify-between items-center py-2 bg-gray-800 text-white">
      {/* Logo */}
      <img src={logo} alt="logoImg" height={50} width={50} /> 

      {/* Input de búsqueda con icono de lupa alineado a la derecha y más largo */}
      <div className="relative w-1/2"> {/* Cambié w-1/4 a w-1/2 para hacerlo más largo */}
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full py-2 pr-10 pl-4 rounded-lg bg-gray-700 text-white placeholder:text-gray-400 focus:outline-none"
        />
        <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {/* Avatar de usuario */}
      <img src={profile} alt="profileImg" height={46} width={46} className="rounded-full" />
    </div>
  );
};
