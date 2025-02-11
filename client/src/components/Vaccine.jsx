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

  // Fetch vaccines from the backend
  const obtenerVacunas = async () => {
    try {
      const response = await axios.get('http://54.167.144.194:3002/api/vaccines', {
        withCredentials: true
      });

      console.log(response.data); // Verifica los datos en la consola
      setData(response.data); // Guarda los datos en el estado
      const vaccinesData = response.data; // Asigna los datos recibidos a una variable
  
      // Si necesitas extraer valores específicos (como ID, nombre, descripción, etc.), puedes hacerlo aquí
      vaccinesData.forEach(vaccine => {
        const { id_vaccine, name, description, dose } = vaccine;
        console.log(id_vaccine, name, description, dose); // Para verificar los datos
      });
  
      setData(vaccinesData); // Establece los datos de las vacunas en el estado
      console.log(response.data); // Check data in console
      setData(response.data); // Save data in state
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
   }
 
   // Close the update modal
   const cerrarModalActualizar = () => {
    setModalActualizar(false);
  
  
  // Close the update modal
  const closeUpdateModal = () => {
    setModalUpdate(false);
  };

  // Insert a new vaccine into the database
  // Insert a new vaccine into the database
  const insertar = async () => {
    try {
      // Realiza la solicitud POST para insertar la nueva vacuna
      await axios.post('http://54.167.144.194:3001/api/createVaccines', form, {
        withCredentials: true
      });
      // Después de insertar la vacuna, obtenemos la lista actualizada de vacunas
      obtenerVacunas(); // Refresh the vaccine list
      // Cierra el modal de inserción
      setModalInsertar(false);
      // Muestra un mensaje de éxito
      toast.success("Vaccine inserted successfully");
    } catch (error) {
      // Si ocurre un error, mostramos un mensaje de error
      toast.error("Error while inserting vaccine");
      console.error(error); // Log para depuración
    }
  };


  const editar = async () => {
      try {
        const response = await axios.put('http://54.161.148.130:3004/api/updateVaccines', form, {
          withCredentials: true
        });
        if (response.data) {
          toast.success("Vaccine updated successfully");
          obtenerVacunas(); // Refresh the vaccine list
          setModalActualizar(false); // Close the update modal
          fetchVaccines(); // Refresh the vaccine list
          setModalUpdate(false);
        } else {
          toast.error("Error while updating vaccine");
        }
      } catch (error) {
        toast.error("Error while updating vaccine");
        console.error(error); // Log the error for debugging
        console.error(error); // Log for debugging
      }
    };

  // Delete a vaccine
  const deleteVaccine = async (id_vaccine) => {
    try {
      const response = await axios.delete(`http://54.167.144.194:3003/api/deleteVaccine/${id_vaccine}`, {
        withCredentials: true
      });
      if (response.data) {
        toast.success("Vaccine deleted successfully");
        fetchVaccines(); // Refresh the vaccine list
      } else {
        toast.error("Error while deleting vaccine");
      }
    } catch (error) {
      toast.error("Error while deleting vaccine");
      console.error(error); // Log for debugging
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
                  <Button color="primary" onClick={() => showUpdateModal(vaccine)}>
                    <FaEdit /> {/* Icon to edit vaccine */}
                  </Button>
                  <Button color="danger" className="ml-2" onClick={() => deleteVaccine(vaccine.id_vaccine)}>
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
