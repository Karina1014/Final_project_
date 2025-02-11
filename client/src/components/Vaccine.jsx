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
      const response = await axios.get("http://3.82.128.130:3002/api/vaccines", {
        withCredentials: true,
      });
      setData(response.data); // Guardar los datos en el estado
      console.log(response.data); // Verifica los datos en la consola
    } catch (error) {
      toast.error("Error al obtener las vacunas");
      console.error("Error fetching vaccines:", error);
    }
  };

  // Llamar a la función obtenerVacunas cuando el componente se monta
  useEffect(() => {
    obtenerVacunas();
  }, []); // El arreglo vacío asegura que se ejecute solo una vez al montar el componente

  return (
    <div>
      <ToastContainer /> {/* Aquí se mostrarán las notificaciones */}

      {/* Tabla de Vacunas */}
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
