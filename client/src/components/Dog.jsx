import { useState, useEffect } from "react";

const Dog = () => {
  const [dogs, setDogs] = useState([]);
  const [form, setForm] = useState({ nameDog: "", breed: "", age: "", gener: "", image: null });

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    try {
      const response = await fetch("http://18.211.169.160:4001/api/dog/list");
      const data = await response.json();
      setDogs(data);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await fetch("http://18.211.169.160:4000/api/dog/add", {
        method: "POST",
        body: formData,
      });
      fetchDogs();
    } catch (error) {
      console.error("Error adding dog:", error);
    }
  };

  return (
    <div>
      <h1>Dog List</h1>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>{dog.nameDog} - {dog.breed} - {dog.age} years old</li>
        ))}
      </ul>

      <h2>Add a Dog</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nameDog" placeholder="Name" value={form.nameDog} onChange={handleChange} required />
        <input type="text" name="breed" placeholder="Breed" value={form.breed} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
        <input type="text" name="gener" placeholder="Gender" value={form.gener} onChange={handleChange} required />
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit">Add Dog</button>
      </form>
    </div>
  );
};

export default Dog;