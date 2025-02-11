import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from "reactstrap";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Icons for edit and delete
import { ToastContainer, toast } from 'react-toastify'; // Toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // CSS for Toastify

const Vaccine = () => {
  const [data, setData] = useState([]); // State to store vaccine data
  const [modalInsertar, setModalInsertar] = useState(false); // State to control the insert modal
  const [modalActualizar, setModalActualizar] = useState(false); // State to control the update modal
  const [form, setForm] = useState({
    id_vaccine: "", // Vaccine ID (used for editing and deleting)
    name: "", // Vaccine name
    description: "", // Vaccine description
    dose: "", // Dose of the vaccine
  });

  const backendUrl = 'http://54.167.144.194';

  const obtenerVacunas = async () => {
    try {
      const response = await axios.get(`${backendUrl}:3002/api/vaccines`, {
        withCredentials: true,  // Aquí está el objeto de configuración correcto
      });
      console.log(response.data); // Verifica los datos en la consola
      setData(response.data); // Guarda los datos en el estado
    } catch (error) {
      toast.error("Error while fetching vaccines");
      console.error(error); // Log the error for debugging
    }
  };
  
  
  

  useEffect(() => {
    obtenerVacunas(); // Fetch vaccines when the component mounts
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value, // Update the form state with the new value
    });
  };

  // Show the modal for inserting a new vaccine
  const mostrarModalInsertar = () => {
    setForm({
      id_vaccine: "",
      name: "",
      description: "",
      dose: "",
    });
    setModalInsertar(true); // Open the insert modal
  };

  // Close the insert modal
  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  // Show the modal for updating an existing vaccine
  const mostrarModalActualizar = (dato) => {
    setForm(dato); // Set the form with the data to be updated
    setModalActualizar(true); // Open the update modal
  };

  // Close the update modal
  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  // Insert a new vaccine into the database
  const insertar = async () => {
    try {
      await axios.post(`${backendUrl}:3001/api/createVaccines`, form,{
        withCredentials: true,  // Aquí está el objeto de configuración correcto
      });
      obtenerVacunas(); // Refresh the vaccine list
      setModalInsertar(false); // Close the insert modal
      toast.success("Vaccine inserted successfully");
    } catch (error) {
      toast.error("Error while inserting vaccine");
      console.error(error); // Log the error for debugging
    }
  };

  // Edit an existing vaccine
  const editar = async () => {
    try {
      const response = await axios.put(`${backendUrl}:3004/api/updateVaccines`, form,
        {
          withCredentials: true,  // Aquí está el objeto de configuración correcto
        });
      if (response.data) {
        toast.success("Vaccine updated successfully");
        obtenerVacunas(); // Refresh the vaccine list
        setModalActualizar(false); // Close the update modal
      } else {
        toast.error("Error while updating vaccine");
      }
    } catch (error) {
      toast.error("Error while updating vaccine");
      console.error(error); // Log the error for debugging
    }
  };

  // Delete a vaccine
  const eliminar = async (id_vaccine) => {
    try {
      const response = await axios.delete(`${backendUrl}:3003/api/deleteVaccine/${id_vaccine}`,
      {
        withCredentials: true,  // Aquí está el objeto de configuración correcto
      });
      if (response.data) {
        toast.success("Vaccine deleted successfully");
        obtenerVacunas(); // Refresh the vaccine list
      } else {
        toast.error("Error while deleting vaccine");
      }
    } catch (error) {
      toast.error("Error while deleting vaccine");
      console.error(error); // Log the error for debugging
    }
  };

  return (
    <>
      <Button color="success" onClick={mostrarModalInsertar}>Insert New Vaccine</Button>
      <div className="mt-4">
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Dose</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vaccine) => (
            <tr key={vaccine.id_vaccine}>
              <td>{vaccine.id_vaccine}</td> {/* Display vaccine ID */}
              <td>{vaccine.name}</td> {/* Display vaccine name */}
              <td>{vaccine.description}</td> {/* Display vaccine description */}
              <td>{vaccine.dose}</td> {/* Display vaccine dose */}
              <td>
                <Button color="primary" onClick={() => mostrarModalActualizar(vaccine)}>
                  <FaEdit /> {/* Icon to edit vaccine */}
                </Button>
                <Button color="danger" className="ml-2" onClick={() => eliminar(vaccine.id_vaccine)}>
                  <FaTrashAlt /> {/* Icon to delete vaccine */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>

      {/* Insert Modal */}
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insert Vaccine</ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Name</label>
            <Input type="text" name="name" value={form.name} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <label>Description</label>
            <Input type="text" name="description" value={form.description} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <label>Dose</label>
            <Input type="text" name="dose" value={form.dose} onChange={handleChange} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={insertar}>Insert</Button>
          <Button color="secondary" onClick={cerrarModalInsertar}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Update Modal */}
      <Modal isOpen={modalActualizar}>
        <ModalHeader>Update Vaccine</ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Name</label>
            <Input type="text" name="name" value={form.name} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <label>Description</label>
            <Input type="text" name="description" value={form.description} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <label>Dose</label>
            <Input type="text" name="dose" value={form.dose} onChange={handleChange} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={editar}>Update</Button>
          <Button color="secondary" onClick={cerrarModalActualizar}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
};

export default Vaccine;
