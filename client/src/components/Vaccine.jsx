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
      const response = await axios.get("http://18.211.169.160:3002/api/vaccines", { withCredentials: true });
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
    setForm(dato); // Aquí se establece el objeto con la información de la vacuna a editar
    setModalActualizar(true);
  };
  const cerrarModalActualizar = () => setModalActualizar(false);

  // Insertar vacuna
  const insertar = async () => {
    try {
      await axios.post("http://18.211.169.160:3001/api/createVaccines", form, { withCredentials: true });
      obtenerVacunas();
      cerrarModalInsertar();
      toast.success("Vacuna insertada correctamente");
    } catch (error) {
      toast.error("Error al insertar la vacuna");
    }
  };

  // Editar vacuna
  const editar = async () => {
    try {
      const formData = {
        id_vaccine: form.id_vaccine, // Asegúrate de usar id_vaccine, no id
        name: form.name,
        description: form.description,
        dose: form.dose
      };

      // Verifica que no haya campos vacíos antes de enviar
      if (!formData.id_vaccine || !formData.name || !formData.description || !formData.dose) {
        toast.error("Todos los campos son obligatorios.");
        return;
      }

      console.log("Enviando datos:", formData); // Verifica en la consola que los datos sean correctos

      const response = await axios.put(
        "http://18.211.169.160:3004/api/updateVaccines", 
        formData, 
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      console.log("Respuesta del servidor:", response.data);
      obtenerVacunas(); // Recarga las vacunas después de la actualización
      cerrarModalActualizar();
      toast.success("Vacuna actualizada correctamente");
    } catch (error) {
      console.error("Error en la actualización:", error.response?.data || error.message);
      toast.error("Error al actualizar la vacuna");
    }
  };

  // Eliminar vacuna
  const eliminar = async (id_vaccine) => {
    try {
      await axios.delete(`http://18.211.169.160:3004/api/deleteVaccines/${id_vaccine}`, { withCredentials: true });
      obtenerVacunas(); // Recarga las vacunas después de la eliminación
      toast.success("Vacuna eliminada correctamente");
    } catch (error) {
      toast.error("Error al eliminar la vacuna");
    }
  };

  return (
    <div>
      <h1>Vacunas</h1>
      <Button color="primary" onClick={mostrarModalInsertar}>Insertar Vacuna</Button>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Dosis</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vacuna) => (
            <tr key={vacuna.id_vaccine}>
              <td>{vacuna.id_vaccine}</td>
              <td>{vacuna.name}</td>
              <td>{vacuna.description}</td>
              <td>{vacuna.dose}</td>
              <td>
                <Button color="warning" onClick={() => mostrarModalActualizar(vacuna)}>
                  <FaEdit />
                </Button>
                <Button color="danger" onClick={() => eliminar(vacuna.id_vaccine)}>
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para insertar vacuna */}
      <Modal isOpen={modalInsertar} toggle={cerrarModalInsertar}>
        <ModalHeader toggle={cerrarModalInsertar}>Insertar Vacuna</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Input type="text" name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Input type="text" name="dose" placeholder="Dosis" value={form.dose} onChange={handleChange} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={insertar}>Insertar</Button>
          <Button color="secondary" onClick={cerrarModalInsertar}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      {/* Modal para actualizar vacuna */}
      <Modal isOpen={modalActualizar} toggle={cerrarModalActualizar}>
        <ModalHeader toggle={cerrarModalActualizar}>Actualizar Vacuna</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Input type="text" name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Input type="text" name="dose" placeholder="Dosis" value={form.dose} onChange={handleChange} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={editar}>Actualizar</Button>
          <Button color="secondary" onClick={cerrarModalActualizar}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Vaccine;
