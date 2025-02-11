import { useState, useEffect } from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Vaccine = () => {
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalActualizar, setModalActualizar] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', dose: '' });
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  useEffect(() => {
    fetchActiveVaccines();
}, []);

const fetchActiveVaccines = async () => {
    try {
        const response = await axios.get('http://54.167.144.194:3002/api/vaccines');
        const activeVaccines = response.data.filter(vaccine => 
            vaccine.status === "active" && vaccine.available_doses > 0
        );
        setData(activeVaccines);
    } catch (error) {
        toast.error('Error fetching active vaccines');
        console.error(error);
    }
};

const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

  const insertar = async () => {
    try {
      await fetch('http://54.167.144.194:3001/api/vaccines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      toast.success('Vacuna insertada');
      setModalInsertar(false);
      fetchVaccines();
    } catch (error) {
      toast.error('Error insertando vacuna');
      console.error(error);
    }
  };

  const editar = async () => {
    try {
      await fetch(`http://54.167.144.194:3004/api/vaccines/${selectedVaccine.id_vaccine}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      toast.success('Vacuna actualizada');
      setModalActualizar(false);
      fetchVaccines();
    } catch (error) {
      toast.error('Error actualizando vacuna');
      console.error(error);
    }
  };

  const eliminar = async (id_vaccine) => {
    try {
      await fetch(`http://54.167.144.194:3003/api/vaccines/${id_vaccine}`, { method: 'DELETE' });
      toast.success('Vacuna eliminada');
      fetchVaccines();
    } catch (error) {
      toast.error('Error eliminando vacuna');
      console.error(error);
    }
  };

  return (
    <>
      <Button color="success" onClick={() => setModalInsertar(true)}>Insertar Nueva Vacuna</Button>
      <div className="mt-4">
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fabricante</th>
              <th>Dosis</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map((vaccine) => (
              <tr key={vaccine.id}>
                <td>{vaccine.id}</td>
                <td>{vaccine.name}</td>
                <td>{vaccine.manufacturer}</td>
                <td>{vaccine.doses}</td>
                <td>
                  <Button color="primary" onClick={() => { setSelectedVaccine(vaccine); setForm(vaccine); setModalActualizar(true); }}>
                    <FaEdit />
                  </Button>
                  <Button color="danger" className="ml-2" onClick={() => eliminar(vaccine.id)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Vacuna</ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre</label>
            <Input type="text" name="name" value={form.name} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <label>Fabricante</label>
            <Input type="text" name="manufacturer" value={form.manufacturer} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <label>Dosis</label>
            <Input type="number" name="doses" value={form.doses} onChange={handleChange} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={insertar}>Insertar</Button>
          <Button color="secondary" onClick={() => setModalInsertar(false)}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalActualizar}>
        <ModalHeader>Actualizar Vacuna</ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre</label>
            <Input type="text" name="name" value={form.name} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <label>Fabricante</label>
            <Input type="text" name="manufacturer" value={form.manufacturer} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <label>Dosis</label>
            <Input type="number" name="doses" value={form.doses} onChange={handleChange} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={editar}>Actualizar</Button>
          <Button color="secondary" onClick={() => setModalActualizar(false)}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Vaccine;
