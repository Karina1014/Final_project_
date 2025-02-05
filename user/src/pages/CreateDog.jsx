import React, { useState, useEffect } from 'react';
import upload_area from '../assets/upload_area.svg';
import { FaPlus } from 'react-icons/fa6';
import axios from 'axios';

const CreateDog = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    nameDog: "",
    breed: "",
    age: "",
    gener: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!data.nameDog || !data.breed || !data.gener || !data.age || !image) {
      setErrorMessage("All fields are required, including image.");
      return;
    }

    const formData = new FormData();
    formData.append("nameDog", data.nameDog);
    formData.append("breed", data.breed);
    formData.append("gener", data.gener);
    formData.append("age", Number(data.age));
    formData.append("image", image);

    try {
      const response = await axios.post(`${backendUrl}/api/dogs/add`, formData);
      if (response.data.success) {
        setData({
          nameDog: "",
          breed: "",
          age: "",
          gener: "",
        });
        setImage(null);
        setErrorMessage(""); // Clear error message if upload is successful
      } else {
        setErrorMessage("Error al agregar el Dog.");
      }
    } catch (error) {
      console.error("Hubo un error al enviar el formulario:", error);
      setErrorMessage("Hubo un error al enviar el formulario.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      encType="multipart/form-data"
      className="space-y-6"
    >
      <h4 className="text-3xl font-bold text-center text-indigo-900">Dogs Upload</h4>
  
      {/* Error message display */}
      {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  
        {/* Image upload area */}
        <div className="flex flex-col items-center gap-y-4">
          <p className="text-lg text-gray-800">Upload Image</p>
          <label htmlFor="image" className="flex justify-center cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt="Upload area"
              className="h-32 w-32 rounded-full border-4 border-indigo-400 p-2 hover:opacity-80 transition-opacity"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
            aria-label="Upload dog image"
          />
        </div>
  
        {/* Form fields */}
        <div className="space-y-6">
          <div className="space-y-4">
            <label htmlFor="nameDog" className="text-lg text-gray-800">
              Dog Name
            </label>
            <input
              onChange={onChangeHandler}
              value={data.nameDog}
              name="nameDog"
              type="text"
              placeholder="Enter dog name"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 w-full"
              required
              aria-label="Dog name"
            />
          </div>
  
          <div className="space-y-4">
            <label htmlFor="breed" className="text-lg text-gray-800">
              Dog Breed
            </label>
            <textarea
              onChange={onChangeHandler}
              value={data.breed}
              name="breed"
              placeholder="Write breed here"
              rows={4}
              required
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 w-full"
              aria-label="Dog breed"
            />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gender field */}
            <div className="space-y-4">
              <label htmlFor="gener" className="text-lg text-gray-800">
                Dog Gender
              </label>
              <select
                onChange={onChangeHandler}
                value={data.gener}
                name="gener"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 w-full"
                aria-label="Dog gender"
              >
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>
  
            {/* Age field */}
            <div className="space-y-4">
              <label htmlFor="age" className="text-lg text-gray-800">
                Dog Age
              </label>
              <input
                onChange={onChangeHandler}
                value={data.age}
                name="age"
                type="number"
                placeholder="Enter age"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 w-full"
                required
                aria-label="Dog age"
              />
            </div>
          </div>
        </div>
      </div>
  
      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white text-xl rounded-lg transform transition-all duration-200 hover:bg-indigo-700 active:scale-95"
      >
        <FaPlus className="inline mr-2" />
        Add Dog
      </button>
    </form>
  );
};

export default CreateDog;
