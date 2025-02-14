import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';  // Import toast
import 'react-toastify/dist/ReactToastify.css';  // Toastify styles

const Dog = () => {
  const backendUrl = "http://localhost:4001";  // Backend URL
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    id: "",
    nameDog: "",
    breed: "",
    age: "",
    gender: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [dogs, setDogs] = useState([]);
  const [showInsertModal, setShowInsertModal] = useState(false);

  // Load the list of dogs on component mount
  useEffect(() => {
    axios.get(`${backendUrl}/api/dogs/list`)
      .then(response => {
        setDogs(response.data.dogs);  // Assuming `response.data.dogs` contains the list of dogs
      })
      .catch(error => console.error("Error fetching dogs:", error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit  = async (event) => {
    event.preventDefault();

    if (!data.nameDog || !data.breed || !data.gener || !data.age || !data.image) {
      setErrorMessage("Todos los campos son obligatorios, incluyendo la imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("nameDog", data.nameDog);
    formData.append("breed", data.breed);
    formData.append("gener", data.gener);
    formData.append("age", Number(data.age));
    formData.append("image", image);

    try {
      const response = await axios.post(`http://localhost:4000/api/dogs/add`, formData);
      if (response.data.success) {
        setDogs([...dogs, response.data.dog]);  // Agregar el nuevo perro a la lista
        openInsertModal(false);
        setErrorMessage("");
        setData({ nameDog: "", breed: "", age: "", gener: "",image:"" });
        setImage(null);
        toast.success("Perro agregado correctamente");  // Mostrar mensaje de éxito
      } else {
        setErrorMessage("Hubo un error al agregar el perro.");
        toast.error("Hubo un error al agregar el perro");  // Mostrar mensaje de error
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setErrorMessage("Hubo un error al enviar el formulario.");
      toast.error("Hubo un error al enviar el formulario");  // Mostrar mensaje de error
    }
  };

  const openInsertModal = () => {
    setData({ id: "", nameDog: "", breed: "", age: "", gender: "", image: "" });
    setShowInsertModal(true);
  };

  const closeInsertModal = () => {
    setShowInsertModal(false);
  };

  const deleteDog = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/dogs/delete/${id}`);
      if (response.data.success) {
        setDogs(dogs.filter((dog) => dog.id !== id));  // Remove the dog from the list
        toast.success("Dog deleted successfully");  // Show success message
      } else {
        toast.error("Failed to delete the dog");  // Show error message
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error deleting the dog: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error(`Error making the request: ${error.message}`);
      }
    }
  };

  return (
    <>
      <Button variant="success" onClick={openInsertModal}>
        <FaPlus /> Add New Dog
      </Button>

      <div className="mt-4">
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map((dog, index) => (
              <tr key={dog.id}>
                <td>{index + 1}</td>
                <td>{dog.nameDog}</td>
                <td>{dog.breed}</td>
                <td>{dog.age}</td>
                <td>{dog.gender}</td>
                <td>
                  <Button variant="danger" onClick={() => deleteDog(dog.id)}>
                    <FaTrashAlt /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Insert Modal */}
      <Modal show={showInsertModal} onHide={closeInsertModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Dog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="formNameDog">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="nameDog"
                value={data.nameDog}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBreed">
              <Form.Label>Breed</Form.Label>
              <Form.Control
                type="text"
                name="breed"
                value={data.breed}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={data.age}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={data.gender}
                onChange={handleChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </Form.Group>

            {errorMessage && (
              <div className="mt-2 text-danger">{errorMessage}</div>
            )}

            <Modal.Footer>
              <Button variant="primary" type="submit">
                Add
              </Button>
              <Button variant="secondary" onClick={closeInsertModal}>
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ToastContainer for notifications */}
      <ToastContainer />
    </>
  );
};

export default Dog;