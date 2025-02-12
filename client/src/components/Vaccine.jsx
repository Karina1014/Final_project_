import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Vaccine = () => {
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalActualizar, setModalActualizar] = useState(false);
  const [form, setForm] = useState({
    id_vaccine: "",
    name: "",
    description: "",
    dose: ""
  });

  // Obtener vacunas
  const obtenerVacunas = async () => {
    try {
      const response = await axios.get("http://54.211.138.107:3002/api/vaccines", { withCredentials: true });
      setData(response.data);
    } catch (error) {
      toast.error("Error al obtener las vacunas");
    }
  };

  useEffect(() => {
    obtenerVacunas();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Mostrar/Cerrar modal de inserción
  const mostrarModalInsertar = () => {
    setForm({ id_vaccine: "", name: "", description: "", dose: "" });
    setModalInsertar(true);
  };
  const cerrarModalInsertar = () => setModalInsertar(false);

  // Mostrar/Cerrar modal de actualización
  const mostrarModalActualizar = (dato) => {
    setForm(dato);
    setModalActualizar(true);
  };
  const cerrarModalActualizar = () => setModalActualizar(false);

  // Insertar vacuna
   // Insertar vacuna
   const insertar = async () => {
    try {
      await axios.post("http://54.211.138.107:3001/api/createVaccines", form, { withCredentials: true });
      obtenerVacunas();
      cerrarModalInsertar();
      toast.success("Vacuna insertada correctamente");
    } catch (error) {
      toast.error("Error al insertar la vacuna");
    }
  };
  
  const editar = async () => {
  try {
    const formData = {
      id: form.id_vaccine, // Cambia id_vaccine a id, si el backend lo espera así
      name: form.name,
      description: form.description,
      dose: form.dose
    };

    console.log("Enviando datos:", formData); // Verifica en la consola que los datos sean correctos

    const response = await axios.put(
      "http://54.211.138.107:3004/api/updateVaccines", 
      formData, 
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    console.log("Respuesta del servidor:", response.data);
    obtenerVacunas();
    cerrarModalActualizar();
    toast.success("Vacuna actualizada correctamente");
  } catch (error) {
    console.error("Error en la actualización:", error.response?.data || error.message);
    toast.error("Error al actualizar la vacuna");
  }
};

  // Eliminar vacuna
  const eliminar = async (id) => {
    try {
      await axios.delete(`http://54.211.138.107:3003/api/vaccines/${id}`, { withCredentials: true });
      obtenerVacunas();
      toast.success("Vacuna eliminada correctamente");
    } catch (error) {
      toast.error("Error al eliminar la vacuna");
    }
  };

  return (
    <>
      <Button color="success" onClick={mostrarModalInsertar}>Insertar Nueva Vacuna</Button>
      <div className="mt-4">
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Dosis</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map((vaccine, index) => (
              <tr key={vaccine.id_vaccine}>
                <td>{index + 1}</td>
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
            <Input type="number" name="dose" value={form.dose} onChange={handleChange} />
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
          <label>ID</label>
          <Input type="text" name="id_vaccine" value={form.id_vaccine || ""} readOnly />
        </FormGroup>
        <FormGroup>
          <label>Nombre</label>
          <Input type="text" name="name" value={form.name || ""} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <label>Descripción</label>
          <Input type="text" name="description" value={form.description || ""} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <label>Dosis</label>
          <Input type="number" name="dose" value={form.dose || ""} onChange={handleChange} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={editar}>Actualizar</Button>
        <Button color="secondary" onClick={cerrarModalActualizar}>Cancelar</Button>
      </ModalFooter>
    </Modal>

      <ToastContainer />
    </>
  );
};

export default Vaccine;
