import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from "reactstrap";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Vaccine = () => {
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalActualizar, setModalActualizar] = useState(false);
  const [form, setForm] = useState({
    id_vaccine: "",
    name: "",
    description: "",
    dose: "",
  });

  const obtenerVacunas = async () => {
    try {
      const response = await axios.get("http://54.167.144.194:3002/api/vaccines", {
        withCredentials: true, // Permite enviar cookies si el backend lo requiere
      });
  
      const vaccinesData = response.data; // Almacena la respuesta en una variable
  
      // Recorre los datos y extrae los atributos
      vaccinesData.forEach((vaccine) => {
        console.log("ID:", vaccine.id_vaccine);
        console.log("Nombre:", vaccine.name);
        console.log("Descripción:", vaccine.description);
        console.log("Dosis:", vaccine.dose);
      });
  
      setData(vaccinesData); // Guarda los datos en el estado
    } catch (error) {
      toast.error("Error while fetching vaccines");
      console.error(error); // Log the error for debugging
    }
  };
  

  useEffect(() => {
    obtenerVacunas();
  }, []);

  // Actualizar el estado del formulario con los cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Mostrar el modal de inserción
  const mostrarModalInsertar = () => {
    setForm({
      id_vaccine: "",
      name: "",
      description: "",
      dose: "",
    });
    setModalInsertar(true);
  };

  // Cerrar el modal de inserción
  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  // Mostrar el modal de actualización
  const mostrarModalActualizar = (dato) => {
    setForm(dato);
    setModalActualizar(true);
  };

  // Cerrar el modal de actualización
  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  // Insertar una nueva vacuna
  const insertar = async () => {
    try {
      await axios.post("http://54.167.144.194:3001/api/vaccines", form);
      obtenerVacunas();
      setModalInsertar(false);
      toast.success("Vacuna insertada correctamente");
    } catch (error) {
      toast.error("Error al insertar la vacuna");
    }
  };

  // Editar una vacuna
  const editar = async () => {
    try {
      await axios.put(`http://54.167.144.194:3004/api/vaccines/${form.id_vaccine}`, form);
      toast.success("Vacuna actualizada");
      obtenerVacunas();
      setModalActualizar(false);
    } catch (error) {
      toast.error("Error al actualizar la vacuna");
    }
  };

  // Eliminar una vacuna
  const eliminar = async (id) => {
    try {
      await axios.delete(`http://54.167.144.194:3003/api/vaccines/${id}`);
      toast.success("Vacuna eliminada");
      obtenerVacunas();
    } catch (error) {
      toast.error("Error al eliminar la vacuna");
    }
  };

  return (
    <>
      <Button color="success" onClick={mostrarModalInsertar}>Insertar Nueva Vacuna</Button>
      <div className="mt-4">
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Dosis</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vaccine) => (
            <tr key={vaccine.id_vaccine}>
              <td>{vaccine.id_vaccine}</td>
              <td>{vaccine.name}</td>
              <td>{vaccine.description}</td>
              <td>{vaccine.dose}</td>
              <td>
                <Button color="primary" onClick={() => mostrarModalActualizar(vaccine)}>
                  <FaEdit />
                </Button>
                <Button color="danger" className="ml-2" onClick={() => eliminar(vaccine.id_vaccine)}>
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>

      {/* Modal de Inserción */}
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Vacuna</ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre</label>
            <Input type="text" name="name" value={form.name} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <label>Descripción</label>
            <Input type="text" name="description" value={form.description} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <label>Dosis</label>
            <Input type="text" name="dose" value={form.dose} onChange={handleChange} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={insertar}>Insertar</Button>
          <Button color="secondary" onClick={cerrarModalInsertar}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      {/* Modal de Actualización */}
      <Modal isOpen={modalActualizar}>
        <ModalHeader>Actualizar Vacuna</ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre</label>
            <Input type="text" name="name" value={form.name} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <label>Descripción</label>
            <Input type="text" name="description" value={form.description} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <label>Dosis</label>
            <Input type="text" name="dose" value={form.dose} onChange={handleChange} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={editar}>Actualizar</Button>
          <Button color="secondary" onClick={cerrarModalActualizar}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      {/* Contenedor de los toasts */}
      <ToastContainer />
    </>
  );
};

export default Vaccine;
