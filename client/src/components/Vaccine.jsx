import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from "reactstrap";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Icons for edit and delete
import { ToastContainer, toast } from 'react-toastify'; // Toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // CSS for Toastify

const Vaccine = () => {
  const [data, setData] = useState([]); // State to store vaccine data
  const [modalInsert, setModalInsert] = useState(false); // State to control the insert modal
  const [modalUpdate, setModalUpdate] = useState(false); // State to control the update modal
  const [form, setForm] = useState({
    id: "", // Vaccine ID (used for editing and deleting)
    name: "", // Vaccine name
    description: "", // Vaccine description
    dose: "", // Dose of the vaccine
  });

  // Fetch vaccines from the backend
  const fetchVaccines = async () => {
    try {
      const response = await axios.get('http://52.90.87.142:3002/api/vaccines', {
        withCredentials: true
      });

      console.log(response.data); // Check data in console
      setData(response.data); // Save data in state
    } catch (error) {
      toast.error("Error while fetching vaccines");
      console.error(error); // Log the error for debugging
    }
  };

  useEffect(() => {
    fetchVaccines(); // Fetch vaccines when the component mounts
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
  const showInsertModal = () => {
    setForm({
      id: "",
      name: "",
      description: "",
      dose: "",
    });
    setModalInsert(true); // Open the insert modal
  };

  // Close the insert modal
  const closeInsertModal = () => {
    setModalInsert(false);
  };

  // Show the modal for updating an existing vaccine
  const showUpdateModal = (data) => {
    setForm(data); // Set the form with the data to be updated
    setModalUpdate(true); // Open the update modal
  };

  // Close the update modal
  const closeUpdateModal = () => {
    setModalUpdate(false);
  };

  // Insert a new vaccine into the database
  const insert = async () => {
    try {
      await axios.post('http://52.90.87.142:3001/api/createVaccines', form, {
        withCredentials: true
      });
      fetchVaccines(); // Refresh the vaccine list
      setModalInsert(false);
      toast.success("Vaccine inserted successfully");
    } catch (error) {
      toast.error("Error while inserting vaccine");
      console.error(error);
    }
  };

  // Edit an existing vaccine
  const update = async () => {
    try {
      const response = await axios.put('http://52.90.87.142:3004/api/updateVaccines', 
        JSON.stringify(form), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });

      if (response.data) {
        toast.success("Vaccine updated successfully");
        fetchVaccines(); // Refresh the vaccine list
        setModalUpdate(false);
      } else {
        toast.error("Error while updating vaccine");
      }
    } catch (error) {
      toast.error("Error while updating vaccine");
      console.error(error); // Log for debugging
    }
  };

  // Delete a vaccine
  const deleteVaccine = async (id) => {
    try {
      const response = await axios.delete(`http://52.90.87.142:3003/api/deleteVaccine/${id}`, {
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
      <Button color="success" onClick={showInsertModal}>Insert New Vaccine</Button>
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
              <tr key={vaccine.id}>
                <td>{vaccine.id}</td> {/* Display vaccine ID */}
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
      <Modal isOpen={modalInsert}>
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
          <Button color="primary" onClick={insert}>Insert</Button>
          <Button color="secondary" onClick={closeInsertModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Update Modal */}
      <Modal isOpen={modalUpdate}>
        <ModalHeader>Update Vaccine</ModalHeader>
        <ModalBody>
        <FormGroup>
            <label>ID</label>
            <Input type="text" name="ID" value={form.id} readOnly />        
              </FormGroup>
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
          <Button color="primary" onClick={update}>Update</Button>
          <Button color="secondary" onClick={closeUpdateModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
};

export default Vaccine;
