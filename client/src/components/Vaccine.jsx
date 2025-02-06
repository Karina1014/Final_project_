import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from "reactstrap";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Iconos para editar y eliminar
import { ToastContainer, toast } from 'react-toastify'; // Toastify
import 'react-toastify/dist/ReactToastify.css'; // CSS para los toasts

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

  // Obtener las vacunas
  const obtenerVacunas = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/vaccines");
      setData(response.data);
    } catch (error) {
      toast.error("Error al obtener las vacunas");
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
      await axios.post("http://localhost:3001/api/createVaccines", form);
      obtenerVacunas();
      setModalInsertar(false);
      toast.success("Vacuna insertada correctamente");
    } catch (error) {
      toast.error("Error al insertar vacuna");
    }
  };

  // Editar una vacuna
  const editar = async () => {
    try {
      const response = await axios.put(`http://localhost:3004/api/updateVaccines`, form);
      if (response.data) {
        toast.success("Vacuna actualizada");
        obtenerVacunas();
        setModalActualizar(false);
      } else {
        toast.error("Error al actualizar la vacuna");
      }
    } catch (error) {
      toast.error("Error al actualizar la vacuna");
      console.error(error); // Esto mostrará detalles del error en la consola
    }
  };

  // Eliminar una vacuna
  const eliminar = async (id_vaccine) => {
    try {
      const response = await axios.delete(`http://localhost:3003/api/deleteVaccine/${id_vaccine}`);
      if (response.data) {
        toast.success("Vacuna eliminada");
        obtenerVacunas();
      } else {
        toast.error("Error al eliminar la vacuna");
      }
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
