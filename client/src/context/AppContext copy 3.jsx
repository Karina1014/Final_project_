import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContent = createContext();

export const AppContextProvider = (props) => {

  // Asegurarse de que las cookies se envíen correctamente en todas las solicitudes
  axios.defaults.withCredentials = true;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null); // Inicializa en null

  // Verifica el estado de autenticación
  const getAuthState = async () => {
    try {
      // Endpoint que verifica si el usuario está autenticado
      const { data } = await axios.get(`http://52.72.179.181:6005/api/auth/is-auth`, {
        withCredentials: true, // Asegura que las cookies se envíen
      });

      if (data.success) {
        setIsLoggedin(true);
        getUserData();  // Si está autenticado, obtenemos los datos del usuario
      } else {
        setIsLoggedin(false); // Si no está autenticado, actualiza el estado
      }
    } catch (error) {
      setIsLoggedin(false);  // Asegurarse de que el estado sea false en caso de error
      toast.error(error.message); // Mejor manejo de errores
    }
  };

  // Obtener los datos del usuario
  const getUserData = async () => {
    try {
      // Aquí no necesitamos pasar el token manualmente si ya se envían las cookies.
      const { data } = await axios.get(`http://52.72.179.181:6005/api/user/data`, {
        withCredentials: true, // Asegura que las cookies se envíen
      });

      if (data.success) {
        setUserData(data.userData); // Establece los datos del usuario si la respuesta es exitosa
      } else {
        toast.error(data.message || 'Unable to fetch user data');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message); // Manejo de errores
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
