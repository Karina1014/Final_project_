import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Navbar} from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {CreateUser }from "./pages/CreateUser";
import {ListUser } from "./pages/ListUser";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from "./components/Header";
import  CreateDog from "./pages/CreateDog";
import  ListDog from "./pages/ListDog";
import CreateVaccine from "./pages/CreateVaccine";


function App() {
  const url = "http://localhost:4000";  // Backend URL
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Navbar />
      <hr />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
         {/* Sección principal que contiene el Header y el contenido */}
         <div className="flex-1 flex flex-col">
          {/* Mostrar Header solo en la ruta '/' (Inicio) */}
          {location.pathname === "/header" && <Header />}
          
          {/* Contenido dinámico según la ruta */}
          <div className="p-6">
        
        <Routes>
        <Route path="/" element={<Header url={url}/>} />
        <Route path="/create-user" element={<CreateUser url={url}/>} />
        <Route path="/list-users" element={<ListUser url={url}/>} />
        <Route path="/create-dog" element={<CreateDog url={url}/>} />
        <Route path="/list-dog" element={<ListDog url={url}/>} />
        <Route path="/create-vaccine" element={<CreateVaccine url={url}/>} />

        </Routes>
      </div>
      </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
