import { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom'; // Navegar Hook en enrutador
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const { userData, setUserData, setIsLoggedin } = useContext(AppContent);

  // Función para cerrar sesión
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`http://52.72.179.181:6004/api/auth/logout`);
  
      if (data.success) {
        localStorage.removeItem("userData"); // Eliminar usuario de localStorage
        setIsLoggedin(false);
        setUserData(null);
        toast.success('Successfully logged out');
        navigate('/');
      } else {
        toast.error('Error logging out');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error during logout');
    }
  };
  
useEffect(() => {
  const storedUser = localStorage.getItem("userData");
  if (storedUser) {
    setUserData(JSON.parse(storedUser)); // Cargar datos guardados
    setIsLoggedin(true);
  }
}, []);


  
  // Función para manejar la verificación de correo
  const sendVerifiOTP = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(`http://52.72.179.181:6003/api/auth/send-verify-otp`);

      if (data.success) {
        navigate('/email-verify')
        toast.success(data.message +' Verification email sent!');
      } else {
        toast.error(data.message || 'Error sending verification email');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error during logout');
    
    }
  };


  return (
    <div className='max-padd-container flex justify-between items-center py-2 bg-gray-800 text-white'>
      <img src={assets.conquistadores} alt="logo" className='w-8 sm:w-12' />

      {userData ?
        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
          {/* Mostrar la primera letra del nombre del usuario */}
          {userData.name.charAt(0).toUpperCase()}
          
          {/* Menú desplegable al hacer hover */}
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
              {/* Mostrar la opc.toUpp "Verify email" solo si el usuario tiene la cuenta verificada */}
              {!userData.isAccountVerified && 
                <li onClick={sendVerifiOTP}className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>
                  Verify email
                </li>
              }

              {/* Opción para cerrar sesión */}
              <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>
                Logout
              </li>
            </ul>
          </div>
        </div>
          : 
        <button
          onClick={() => navigate('/login')}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'
        >
          Login
          <img src={assets.arrow_icon} alt="Flecha" />
        </button>
      }
    </div>
  );
};

export default NavbarAdmin;
