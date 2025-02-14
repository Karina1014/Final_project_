import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VaccineCardForm = () => {
    const [dogs, setDogs] = useState([]);
    const [owners, setOwners] = useState([]);
    const [vaccines, setVaccines] = useState([]);
    const [selectedDog, setSelectedDog] = useState('');
    const [selectedOwner, setSelectedOwner] = useState('');
    const [selectedVaccines, setSelectedVaccines] = useState([]);
    const [response, setResponse] = useState(null);

    // Obtener datos del backend al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dogsResponse = await axios.get('http://localhost:9000/dogs');
                const ownersResponse = await axios.get('http://localhost:9000/owners');
                const vaccinesResponse = await axios.get('http://localhost:9000/vaccines');

                setDogs(dogsResponse.data);
                setOwners(ownersResponse.data);
                setVaccines(vaccinesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:7500/create-vaccine-card', {
                dog_name: selectedDog,
                owner_id: selectedOwner,
                vaccine_names: selectedVaccines,
            });
            setResponse(res.data);
        } catch (error) {
            console.error('Error creating vaccine card:', error);
            setResponse({ error: 'Failed to create vaccine card' });
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Vaccine Card</h2>
            <form onSubmit={handleSubmit}>
                {/* Seleccionar perro */}
                <div className="mb-3">
                    <label htmlFor="dog" className="form-label">Select Dog</label>
                    <select
                        className="form-select"
                        id="dog"
                        value={selectedDog}
                        onChange={(e) => setSelectedDog(e.target.value)}
                        required
                    >
                        <option value="">Select a dog</option>
                        {dogs.map((dog) => (
                            <option key={dog.nameDog} value={dog.nameDog}>
                                {dog.nameDog} ({dog.breed})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Seleccionar dueño */}
                <div className="mb-3">
                    <label htmlFor="owner" className="form-label">Select Owner</label>
                    <select
                        className="form-select"
                        id="owner"
                        value={selectedOwner}
                        onChange={(e) => setSelectedOwner(e.target.value)}
                        required
                    >
                        <option value="">Select an owner</option>
                        {owners.map((owner) => (
                            <option key={owner.idCard} value={owner.idCard}>
                                {owner.firstName} {owner.lastName} ({owner.idCard})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Seleccionar vacunas */}
                <div className="mb-3">
                    <label htmlFor="vaccines" className="form-label">Select Vaccines</label>
                    <select
                        className="form-select"
                        id="vaccines"
                        multiple
                        value={selectedVaccines}
                        onChange={(e) => {
                            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                            setSelectedVaccines(selectedOptions);
                        }}
                        required
                    >
                        {vaccines.map((vaccine) => (
                            <option key={vaccine.name} value={vaccine.name}>
                                {vaccine.name}
                            </option>
                        ))}
                    </select>
                    <small className="form-text text-muted">Hold Ctrl (Windows) or Command (Mac) to select multiple.</small>
                </div>

                <button type="submit" className="btn btn-primary">Create</button>
            </form>

            {/* Mostrar respuesta del backend */}
            {response && (
                <div className="mt-3">
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default VaccineCardForm;