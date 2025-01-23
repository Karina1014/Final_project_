import React from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation
import { Navbar } from '../components/Admin/Navbar';
import Sidebar from '../components/Admin/Sidebar';
import {Header} from '../components/Admin/Header'; // Asegúrate de que Header esté importado

const Admin = () => {
  const location = useLocation(); // Obtén la ubicación actual

  return (
    <>
      <Navbar />
      <hr />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        {/* Sección principal que contiene el Header y el contenido */}
        <div className="flex-1 flex flex-col">
          {/* Mostrar Header solo en la ruta '/' */}
          {location.pathname === "/" && <Header />}
          
          {/* Contenido dinámico según la ruta */}
          <div className="p-6">
            {/* Aquí va el contenido de la página dependiendo de la ruta */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
