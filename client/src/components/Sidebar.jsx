import React from 'react';
import { GiSyringe } from 'react-icons/gi';
import { FaDog } from 'react-icons/fa'; // Icono de perro
import { BsHouse } from 'react-icons/bs'; // Íconos para la navegación

const Sidebar = ({ onSelect }) => {
  return (
    <div className="w-1/5 min-h-screen bg-gradient-to-b from-gray-800 to-gray-700 border-r border-gray-600 shadow-lg">
      <div className="flex flex-col gap-8 pt-6 pl-6 pb-4">
        {/* Título del menú */}
        <h3 className="text-gray-200 font-semibold text-2xl mb-6">Menú</h3>
        
        <ul className="space-y-4">
          {/* Opción de Inicio */}
          <li 
            onClick={() => onSelect('Inicio')}
            className="flex items-center gap-4 p-3 rounded-lg text-gray-200 cursor-pointer hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-105"
          >
            <BsHouse size={22} />
            <span className="text-lg font-medium">Inicio</span>
          </li>

      {/* Opción de Vaccine */}
        <li
          onClick={() => onSelect('Vaccine')}
          className="flex items-center gap-4 p-3 rounded-lg text-gray-200 cursor-pointer hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-105"
        >
          <GiSyringe size={22} />
          <span className="text-lg font-medium">Vaccine</span>
          </li>

        {/* Opción de Dog */}
        <li
          onClick={() => onSelect('Dog')}
          className="flex items-center gap-4 p-3 rounded-lg text-gray-200 cursor-pointer hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-105"
        >
          <FaDog size={22} />
          <span className="text-lg font-medium">Dog</span>
        </li>

            {/* Opción de Dog */}
            <li
          onClick={() => onSelect('VaccineCardForm')}
          className="flex items-center gap-4 p-3 rounded-lg text-gray-200 cursor-pointer hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-105"
        >
          <FaDog size={22} />
          <span className="text-lg font-medium">VaccineCardForm</span>
        </li>

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
