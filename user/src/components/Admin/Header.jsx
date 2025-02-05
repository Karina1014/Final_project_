import React from 'react';
import backgroundImage from '../../assets/dogBackground.jpg'; // Asegúrate de tener esta imagen en la carpeta de assets

export const Header = () => {
  return (
    <header className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Fondo oscuro transparente */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Contenido */}
      <div className="relative z-10 text-center text-white py-32">
        <h1 className="text-5xl font-bold">Admin Dashboard</h1>
        <p className="mt-4 text-xl">Welcome, Admin</p>
      </div>
    </header>
  );
};
