import React, { useState, useEffect } from 'react';
import { BsPencil, BsTrash } from "react-icons/bs"; // Importando iconos de editar y eliminar

export const ListUser = () => {
  const [users, setUsers] = useState([]);

  // Simulación de obtener los usuarios (puedes reemplazarlo con una llamada a la API)
  useEffect(() => {
    // Simulación de datos de usuarios para fines de ejemplo
    const fakeUsers = [
      { id: 1, nombre: 'Juan Pérez', correo: 'juan.perez@example.com', telefono: '123-456-7890' },
      { id: 2, nombre: 'Ana Gómez', correo: 'ana.gomez@example.com', telefono: '098-765-4321' },
      { id: 3, nombre: 'Carlos López', correo: 'carlos.lopez@example.com', telefono: '555-123-4567' },
    ];
    setUsers(fakeUsers);
  }, []);

  const handleEdit = (userId) => {
    // Lógica para editar el usuario
    console.log('Editar usuario con ID:', userId);
  };

  const handleDelete = (userId) => {
    // Lógica para eliminar el usuario
    console.log('Eliminar usuario con ID:', userId);
    setUsers(users.filter((user) => user.id !== userId)); // Eliminamos al usuario del array
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">Lista de Usuarios</h1>
      
      {/* Tabla de usuarios */}
      <table className="min-w-full table-auto bg-gray-700 rounded-lg">
        <thead>
          <tr className="text-left text-gray-300 border-b border-gray-600">
            <th className="py-3 px-4">Nombre</th>
            <th className="py-3 px-4">Correo</th>
            <th className="py-3 px-4">Teléfono</th>
            <th className="py-3 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-600">
              <td className="py-3 px-4">{user.nombre}</td>
              <td className="py-3 px-4">{user.correo}</td>
              <td className="py-3 px-4">{user.telefono}</td>
              <td className="py-3 px-4 flex items-center space-x-3">
                {/* Botón Editar */}
                <button
                  onClick={() => handleEdit(user.id)}
                  className="text-blue-500 hover:text-blue-300"
                  title="Editar"
                >
                  <BsPencil size={20} />
                </button>
                {/* Botón Eliminar */}
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 hover:text-red-300"
                  title="Eliminar"
                >
                  <BsTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mensaje si no hay usuarios */}
      {users.length === 0 && (
        <p className="text-center text-gray-400 mt-6">No hay usuarios disponibles.</p>
      )}
    </div>
  );
};
