import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BsChevronDown, BsChevronUp, BsPersonPlus, BsPlus, BsList } from "react-icons/bs"; // Importamos los iconos
import { AiOutlineHome } from "react-icons/ai"; // Icono de Home

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(false); // Estado para manejar el menú desplegable

  return (
    <div className="w-1/5 min-h-screen bg-gray-800 border-r border-gray-700"> {/* Sidebar con fondo gris oscuro */}
      <div className="flex flex-col gap-6 pt-6 pl-6 pb-4">
        
        {/* Enlace Home */}
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive 
              ? "flex items-center gap-x-3 p-3 rounded-lg cursor-pointer border-l-4 border-blue-600 bg-gray-700 text-white transition-colors duration-300" // Activo
              : "flex items-center gap-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-700 text-gray-300 hover:text-white transition-colors duration-300" // Inactivo
          }
          aria-label="Ir a Inicio"
        >
          <AiOutlineHome size={24} />
          <span className="hidden lg:block">Inicio</span>
        </NavLink>
        
        <h3 className="text-gray-300 font-semibold text-lg">Menú</h3> {/* Título del menú */}

        {/* Menú desplegable para Crear Usuario */}
        <div>
          <button 
            onClick={() => setOpenMenu(!openMenu)} // Cambia el estado de openMenu
            className="flex items-center justify-between w-full text-gray-300 hover:text-blue-500 font-medium text-lg cursor-pointer bg-gray-700 rounded-lg p-2 transition-colors duration-300"
            aria-expanded={openMenu} // Mejora la accesibilidad para indicar que el menú está abierto
          >
            <BsPersonPlus size={20} /> {/* Icono para Crear Usuario */}
            <span>Crear Usuario</span>
            {openMenu ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
          </button>

          {/* Submenú para Crear y Listar */}
          {openMenu && (
            <ul className="mt-3 pl-4 space-y-2 border-l border-gray-600">
              <li>
                <NavLink 
                  to="/create-user" 
                  className={({ isActive }) =>
                    isActive 
                      ? "flex items-center gap-x-2 text-blue-600 font-semibold"
                      : "flex items-center gap-x-2 text-gray-300 hover:text-blue-500"
                  }
                  aria-label="Crear un nuevo usuario"
                >
                  <BsPlus size={18} />
                  Crear
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/list-users" 
                  className={({ isActive }) =>
                    isActive 
                      ? "flex items-center gap-x-2 text-blue-600 font-semibold"
                      : "flex items-center gap-x-2 text-gray-300 hover:text-blue-500"
                  }
                  aria-label="Listar usuarios todos"
                >
                  <BsList size={18} />
                  Listar
                </NavLink>
              </li>
            </ul>
          )}
        </div>


         {/* Menú desplegable para Crear Usuario */}
         <div>
          <button 
            onClick={() => setOpenMenu(!openMenu)} // Cambia el estado de openMenu
            className="flex items-center justify-between w-full text-gray-300 hover:text-blue-500 font-medium text-lg cursor-pointer bg-gray-700 rounded-lg p-2 transition-colors duration-300"
            aria-expanded={openMenu} // Mejora la accesibilidad para indicar que el menú está abierto
          >
            <BsPersonPlus size={20} /> {/* Icono para Crear Usuario */}
            <span>Create dog</span>
            {openMenu ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
          </button>

          {/* Submenú para Crear y Listar */}
          {openMenu && (
            <ul className="mt-3 pl-4 space-y-2 border-l border-gray-600">
              <li>
                <NavLink 
                  to="/create-dog" 
                  className={({ isActive }) =>
                    isActive 
                      ? "flex items-center gap-x-2 text-blue-600 font-semibold"
                      : "flex items-center gap-x-2 text-gray-300 hover:text-blue-500"
                  }
                  aria-label="Crear un nuevo usuario"
                >
                  <BsPlus size={18} />
                  Crear
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/list-dog" 
                  className={({ isActive }) =>
                    isActive 
                      ? "flex items-center gap-x-2 text-blue-600 font-semibold"
                      : "flex items-center gap-x-2 text-gray-300 hover:text-blue-500"
                  }
                  aria-label="Listar usuarios"
                >
                  <BsList size={18} />
                  Listar
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Menú desplegable para Crear Vaccination */}
        <div>
          <button 
            onClick={() => setOpenMenu(!openMenu)} // Cambia el estado de openMenu
            className="flex items-center justify-between w-full text-gray-300 hover:text-blue-500 font-medium text-lg cursor-pointer bg-gray-700 rounded-lg p-2 transition-colors duration-300"
            aria-expanded={openMenu} // Mejora la accesibilidad para indicar que el menú está abierto
          >
            <BsPersonPlus size={20} /> {/* Icono para Crear Usuario */}
            <span>Create Vaccine</span>
            {openMenu ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
          </button>

          {/* Submenú para Crear y Listar */}
          {openMenu && (
            <ul className="mt-3 pl-4 space-y-2 border-l border-gray-600">
              <li>
                <NavLink 
                  to="/create-vacine" 
                  className={({ isActive }) =>
                    isActive 
                      ? "flex items-center gap-x-2 text-blue-600 font-semibold"
                      : "flex items-center gap-x-2 text-gray-300 hover:text-blue-500"
                  }
                  aria-label="Crear un nuevo usuario"
                >
                  <BsPlus size={18} />
                  Crear
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/list-dog" 
                  className={({ isActive }) =>
                    isActive 
                      ? "flex items-center gap-x-2 text-blue-600 font-semibold"
                      : "flex items-center gap-x-2 text-gray-300 hover:text-blue-500"
                  }
                  aria-label="Listar usuarios"
                >
                  <BsList size={18} />
                  Listar
                </NavLink>
              </li>
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
