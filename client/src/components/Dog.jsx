import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt,FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dog = () => {
  const backendUrl = "http://34.225.2.117:4001";  // URL del backend
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    id: "",
    nameDog: "",
    breed: "",
    age: "",
    gener: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [dogs, setDogs] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);

  // Cargar la lista de perros al inicio
  const obtenerDogs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/dogs/list`, { withCredentials: true });
      setDogs(response.data.dogs);
    } catch (error) {
      toast.error("Error al obtener los perros");
    }
  };

  useEffect(() => {
    obtenerDogs();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!data.nameDog || !data.breed || !data.gener || !data.age || !image) {
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
      const response = await axios.post(`http://localhost:4000/api/dogs/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setDogs([...dogs, response.data.dog]);  // Agregar el nuevo perro a la lista
        setModalInsertar(false);
        setErrorMessage("");
        setData({ nameDog: "", breed: "", age: "", gener: "" });
        setImage(null);
        toast.success("Perro agregado correctamente");
      } else {
        setErrorMessage("Hubo un error al agregar el perro.");
        toast.error("Hubo un error al agregar el perro");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setErrorMessage("Hubo un error al enviar el formulario.");
      toast.error("Hubo un error al enviar el formulario");
    }
  };

  const mostrarModalInsertar = () => {
    setData({ nameDog: "", breed: "", age: "", gener: "" });
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const eliminar = async (id) => {
    try {
      console.log(`Eliminando perro con ID: ${id}`);  // Verifica si el ID es correcto
      const response = await axios.delete(`http://localhost:4002/api/dogs/deleteDog/${id}`, { withCredentials: true });

      if (response.status === 200) {
        // Recargar la lista de perros después de eliminar
        obtenerDogs();
        toast.success("Perro eliminado correctamente");
      } else {
        toast.error("No se pudo eliminar el perro");
      }
    } catch (error) {
      toast.error()
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={mostrarModalInsertar}><FaPlus /> Agregar Perro</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Raza</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(dogs) && dogs.length > 0 ? (
            dogs.map((dog) => (
              <tr key={dog.id}>
                <td>{dog.nameDog}</td>
                <td>{dog.breed}</td>
                <td>{dog.age}</td>
                <td>{dog.gener}</td>
                <Button color="primary" >
                    <FaEdit />
                  </Button>
                <td>
                  <Button variant="danger" onClick={() => eliminar(dog.id)}><FaTrashAlt /> Eliminar</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No hay perros disponibles</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal para agregar perro */}
      <Modal show={modalInsertar} onHide={cerrarModalInsertar}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Perro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <Form onSubmit={onSubmitHandler}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nameDog"
                value={data.nameDog}
                onChange={onChangeHandler}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Raza</Form.Label>
              <Form.Control
                type="text"
                name="breed"
                value={data.breed}
                onChange={onChangeHandler}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={data.age}
                onChange={onChangeHandler}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Género</Form.Label>
              <Form.Control
                as="select"
                name="gener"
                value={data.gener}
                onChange={onChangeHandler}
                required
              >
                <option value="">Seleccione el género</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={onImageChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Dog;
