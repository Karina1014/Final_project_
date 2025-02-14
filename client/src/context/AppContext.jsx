import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContent = createContext();

export const AppContextProvider = (props) => {

  axios.defaults.withCredentials = true; // Asegurarse de que las cookies se envíen correctamente.

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false); // Inicializar en null

  // Verifica el estado de autenticación
  const getAuthState = async () => {
    try {
      // Cambiar POST a GET para coincidir con el backend
      const { data } = await axios.get('http://52.72.179.181:6005/api/auth/is-auth');
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching auth state');
      setIsLoggedin(false); // Si hay un error, tratamos el usuario como no autenticado
    }
  };

  // Obtener los datos del usuario
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`http://52.72.179.181:6005/api/user/data`);
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || 'Unable to fetch user data');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Llamar a getAuthState cuando el componente se monta
  useEffect(() => {
    getAuthState();
  }, []); // Solo se ejecutará al montar el componente

  const value = {
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
