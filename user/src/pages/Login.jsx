import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiArrowRight } from 'react-icons/fi'; // Importa el ícono de flecha de React Icons
import { assets } from '../assets/assets';
// Importamos los iconos de React Icons
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi'; // Ícono de flecha

export const Login = () => {
  const navigate = useNavigate();
  const backendUrlLogin= "http://localhost:3011"
  const { backendUrl,setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState('Sign Up'); // Estado para alternar entre 'Sign Up' y 'Login'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubitHandler = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    axios.defaults.withCredentials = true;

    try {
      if (state === 'Sign Up') {
        // Lógica para el registro
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else if (state === 'Login') {
        // Lógica para el login
        const { data } = await axios.post(`${backendUrlLogin}/api/auth/login`, {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/email-verify');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
    <div className="flex items-center space-x-4 absolute left-5 top-5">
        <img
          onClick={() => navigate('/')}
          src={assets.vaccine} // Asegúrate de que 'assets.vaccine' tenga la ruta correcta
          alt="logo"
          height={50}
          width={50}
          className="w-12 h-12 sm:w-16 sm:h-16 cursor-pointer" // Ajusta el tamaño según necesidad
        />
      <button
        onClick={() => navigate('/DashboarUser')}
        className="flex items-center justify-center bg-[#0C9AD1] text-white py-3 px-10 rounded-full text-xl font-semibold transition-all duration-300 ease-in-out hover:bg-[#0A88B2] hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <span className="mr-3">DashboardUser</span> {/* Espacio entre el texto y el ícono */}
        <FiArrowRight size={24} /> {/* Icono de flecha */}
      </button>
      <button
        onClick={() => navigate('/Admin')}
        className="flex items-center justify-center bg-[#0C9AD1] text-white py-3 px-10 rounded-full text-xl font-semibold transition-all duration-300 ease-in-out hover:bg-[#0A88B2] hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <span className="mr-3">DashboardAdmin</span> {/* Espacio entre el texto y el ícono */}
        <FiArrowRight size={24} /> {/* Icono de flecha */}
      </button>

      </div>



      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-xl font-bold mb-4">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className="mb-6">
          {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
        </p>
        <form onSubmit={onSubitHandler}>
          {/* Campo Nombre solo en Sign Up */}
          {state === 'Sign Up' && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <FaUser className="text-white" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none w-full text-white"
                type="text"
                placeholder="Full name"
                required
              />
            </div>
          )}

          {/* Campo Email */}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <FaEnvelope className="text-white" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none w-full text-white"
              type="email"
              placeholder="Email ID"
              required
            />
          </div>

          {/* Campo Password */}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <FaLock className="text-white" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none w-full text-white"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          {state === 'Login' && (
            <p
              onClick={() => navigate('/reset-password')}
              className="mb-4 text-indigo-500 cursor-pointer"
            >
              Forgot password?
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium"
          >
            <span>{state}</span>
            <HiArrowNarrowRight className="ml-2" />
          </button>
        </form>

        {state === 'Sign Up' ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
