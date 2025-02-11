import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Vaccine = () => {
  const [data, setData] = useState([]);

  // Función para obtener las vacunas desde la API
  const obtenerVacunas = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/vaccines", {
        withCredentials: true, // Permite credenciales (cookies, sesiones, etc.)
      });

     setData(response.data); // Save the data in the state
           console.log(response.data); // Verifica los datos en la consola
           setData(response.data); // Guarda los datos en el estado
           const vaccinesData = response.data; // Asigna los datos recibidos a una variable
       
           // Si necesitas extraer valores específicos (como ID, nombre, descripción, etc.), puedes hacerlo aquí
           vaccinesData.forEach(vaccine => {
             const { id_vaccine, name, description, dose } = vaccine;
             console.log(id_vaccine, name, description, dose); // Para verificar los datos
           });
       
           setData(vaccinesData); // Establece los datos de las vacunas en el estado
         } catch (error) {
           toast.error("Error while fetching vaccines");
         }
       };

  // Llamar a la función obtenerVacunas cuando el componente se monta
  useEffect(() => {
    obtenerVacunas();
  }, []); 

  return (
    <div>
      <ToastContainer /> {/* Aquí se mostrarán las notificaciones */}

      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Dosis</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vaccine, index) => (
            <tr key={vaccine.id_vaccine}>
              <td>{index + 1}</td>
              <td>{vaccine.name}</td>
              <td>{vaccine.description}</td>
              <td>{vaccine.dose}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Vaccine;
