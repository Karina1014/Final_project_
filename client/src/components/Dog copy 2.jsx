import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';  // Importamos toast
import 'react-toastify/dist/ReactToastify.css';  // Estilos de Toastify

const Dog = () => {
  const backendUrl = "http://localhost:4001";  // URL del backend
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    id:"",
    nameDog: "",
    breed: "",
    age: "",
    gener: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [dogs, setDogs] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);

  // // Cargar la lista de perros al inicio
  // useEffect(() => {
  //   axios.get(`${backendUrl}/api/dogs/list`)
  //     .then(response => {
  //       setDogs(response.data.dogs);  // Suponiendo que `response.data.dogs` contiene la lista de perros
  //     })
  //     .catch(error => console.error("Error fetching dogs:", error));
  // }, []);

   // Obtener vacunas
   const obtenerDog = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/dogs/list", { withCredentials: true });
      setDogs(response.data.dogs);
    } catch (error) {
      toast.error("Error al obtener las vacunas");
    }
  };

   useEffect(() => {
      obtenerDog();
    }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
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
      const response = await axios.post(`http://localhost:4000/api/dogs/add`, formData);
      if (response.data.success) {
        setDogs([...dogs, response.data.dog]);  // Agregar el nuevo perro a la lista
        setModalInsertar(false);
        setErrorMessage("");
        setData({ nameDog: "", breed: "", age: "", gener: "" });
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

  const mostrarModalInsertar = () => {
    setData({ id: "", nameDog: "", breed: "", age: "", gener: "", image: "" });
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const eliminar = async (id) => {
    try {
      // Realizamos la solicitud de eliminación
      const response = await axios.delete(`http://localhost:4002/api/dogs/delete/${id}`);
  
      // Verificamos si la respuesta tiene un mensaje de éxito
      if (response.data.success) {
        setDogs(dogs.filter((dog) => dog.id !== id));  // Eliminar el perro de la lista
        toast.success("Perro eliminado correctamente");  // Mostrar mensaje de éxito
      } else {
        toast.error("No se pudo eliminar el perro");  // Mostrar mensaje de error
      }
    } catch (error) {
      // Manejo de errores con más detalles
      if (error.response) {
        // El error tiene una respuesta del servidor
        toast.error(`Error al eliminar el perro: ${error.response.data.message || 'Error desconocido'}`);
      } else if (error.request) {
        // El error ocurrió al hacer la solicitud, pero no recibimos respuesta
        toast.error("No se recibió respuesta del servidor");
      } else {
        // Error al configurar la solicitud
        toast.error(`Error al realizar la solicitud: ${error.message}`);
      }
    }
  };

  return (
    <>
      <Button variant="success" onClick={mostrarModalInsertar}>
        Insertar Nueva Mascota
      </Button>

      <div className="mt-4">
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Género</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map((dog, index) => (
              <tr key={dog.id}>
                <td>{index + 1}</td>
                <td>{dog.nameDog}</td>
                <td>{dog.breed}</td>
                <td>{dog.age}</td>
                <td>{dog.gener}</td>
                <td>
                  <Button variant="danger" onClick={() => eliminar(dog.id)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal de Inserción */}
      <Modal show={modalInsertar} onHide={cerrarModalInsertar}>
        <Modal.Header closeButton>
          <Modal.Title>Insertar Nueva Mascota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitHandler} encType="multipart/form-data">
            <Form.Group controlId="formNameDog">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nameDog"
                value={data.nameDog}
                onChange={onChangeHandler}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBreed">
              <Form.Label>Raza</Form.Label>
              <Form.Control
                type="text"
                name="breed"
                value={data.breed}
                onChange={onChangeHandler}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAge">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={data.age}
                onChange={onChangeHandler}
                required
              />
            </Form.Group>

            <Form.Group controlId="formGener">
              <Form.Label>Género</Form.Label>
              <Form.Control
                as="select"
                name="gener"
                value={data.gener}
                onChange={onChangeHandler}
                required
              >
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Subir Imagen</Form.Label>
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
                Insertar
              </Button>
              <Button variant="secondary" onClick={cerrarModalInsertar}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ToastContainer donde se mostrarán las notificaciones */}
      <ToastContainer />
    </>
  );
};

export default Dog;
