import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TbTrash } from 'react-icons/tb';

const ListDog = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/dogs/list`);
      if (response.data.success) {
        setList(response.data.dogs);
      } else {
        toast.error("Error fetching data.");
      }
    } catch (error) {
      console.error("Error fetching dog list:", error);
      toast.error("Error fetching data.");
    }
  };

  const removeDog = async (dogId) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/dogs/remove/${dogId}`);
      if (response.data.success) {
        setList(list.filter(dog => dog._id !== dogId)); // Remove from local list
        toast.success("Dog removed");
      } else {
        toast.error("Error removing dog");
      }
    } catch (error) {
      console.error("Error removing dog:", error);
      toast.error("Error removing dog");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const indexOfLastDog = currentPage * itemsPerPage;
  const indexOfFirstDog = indexOfLastDog - itemsPerPage;
  const currentDogs = list.slice(indexOfFirstDog, indexOfLastDog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  return (
    <section className="p-6 sm:p-10 w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg">
      <h4 className="text-3xl font-bold text-center text-white mb-6">Dogs List</h4>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
        <table className="w-full text-left text-sm table-auto">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Breed</th>
              <th className="p-3">Age</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Remove</th>
            </tr>
          </thead>
          <tbody>
            {currentDogs.map((dog) => (
              <tr key={dog._id} className="hover:bg-gray-100 transition-all">
                <td className="p-3">
                  <img
                    src={`${backendUrl}/images/${dog.image}`}
                    alt="dogImg"
                    className="h-32 w-32 rounded-full border-4 border-indigo-400 p-2"
                  />
                </td>
                <td className="p-3">{dog.nameDog}</td>
                <td className="p-3">{dog.breed}</td>
                <td className="p-3">{dog.age} years</td>
                <td className="p-3">{dog.gener}</td>
                <td className="p-3 text-center">
                  <div
                    className="text-xl text-red-600 cursor-pointer hover:text-red-800"
                    onClick={() => removeDog(dog._id)}
                  >
                    <TbTrash />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-3 bg-indigo-600 text-white rounded-lg mr-2 hover:bg-indigo-700 disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="p-3 text-lg text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-3 bg-indigo-600 text-white rounded-lg ml-2 hover:bg-indigo-700 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ListDog;
