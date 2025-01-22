import React, { useState } from 'react';

const CreateVaccine = () => {

  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    Done: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario.
    console.log(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">Nueva Cuenta de Usuario</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Columna 1 */}
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-300">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
            className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="apellidos" className="block text-sm font-medium text-gray-300">Apellidos</label>
          <input
            type="text"
            id="Description"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            placeholder="Ingresa name de vaccine"
            className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Columna 2 */}
        <div className="mb-4">
          <label htmlFor="ciudad" className="block text-sm font-medium text-gray-300">Ciudad</label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            placeholder="Ingresa tu ciudad"
            className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-300">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Ingresa tu teléfono"
            className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Columna 1 */}
        <div className="mb-4">
          <label htmlFor="correo" className="block text-sm font-medium text-gray-300">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="Ingresa tu correo"
            className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        

        {/* Botón de envío */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Crear Cuenta
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateVaccine