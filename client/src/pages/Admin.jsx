import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Vaccine from '../components/Vaccine'; 
import HeaderAdmin from '../components/HeaderAdmin';
import NavbarAdmin from '../components/NavbarAdmin';
import Dog from '../components/Dog'; 

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
              <HeaderAdmin />
            </div>
          )}

          {selectedMenu === 'Vaccine' && (
            <Vaccine />  
          )}
          {selectedMenu === 'Dog' && (
            <Dog />  
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Admin;
