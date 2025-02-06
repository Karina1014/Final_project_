import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Conquistador from '../components/Conquistador'; // Para la tabla de Conquistadores
import Header from '../components/Header';
import NavbarAdmin from '../components/NavbarAdmin';
import ConquistadorScore from '../components/ConquistadorScore';
import Ranking from '../components/Ranking';

const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState('Inicio'); // Estado para controlar el menú seleccionado

  // Función que se pasa a la barra lateral para actualizar el menú seleccionado
  const handleSelect = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div >
      {/* Barra superior fija */}
      <NavbarAdmin />
      <div className="flex "> {/* Agregamos un margen superior para que no se solape el contenido */}
        {/* Barra lateral */}
        <Sidebar onSelect={handleSelect} />
      
        {/* Contenido principal */}
        <div className="flex-1 p-6 bg-gray-100">
          {selectedMenu === 'Inicio' && (
            <div>
              <Header />
            </div>
          )}

          {selectedMenu === 'Conquistadores' && (
            <Conquistador />  
          )}
          {selectedMenu === 'ConquistadorScore' && (
            <ConquistadorScore />  
          )}
          {selectedMenu === 'Ranking' && (
            <Ranking />  
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
