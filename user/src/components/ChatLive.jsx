import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Conexión al servidor de Socket.IO
const socket = io('http://localhost:4000'); // Cambia la URL según tu configuración

const ChatLive = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false); // Para manejar el estado del chat (abierto/cerrado)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  // Establecer el rol al conectar
  useEffect(() => {
    socket.emit('setRole', role);

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Limpiar cuando el componente se desmonte
    return () => {
      socket.off('message');
    };
  }, [role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: role === 'admin' ? 'Admin' : 'User', // Cambiar de acuerdo al rol
    };
    setMessages([...messages, newMessage]);
    socket.emit('message', message);
    setMessage('');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Icono flotante para abrir el chat */}
      <div 
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-blue-500 p-3 rounded-full cursor-pointer shadow-lg z-50"
      >
        <span className="text-white text-2xl">💬</span>
      </div>

      {/* Contenedor de Chat Flotante */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 bg-white p-4 rounded-lg shadow-lg w-80 h-80 flex flex-col z-50">
          <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">
            {role === 'admin' ? 'Admin Chat' : 'User Chat'}
          </h2>

          {/* Lista de mensajes */}
          <div className="flex-grow overflow-auto space-y-3 mb-4">
            {messages.map((message, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-semibold text-gray-700">{message.from}:</span>
                <span className="text-gray-600">{message.body}</span>
              </div>
            ))}
          </div>

          {/* Campo de entrada y botón para enviar mensaje */}
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border rounded-l-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button 
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatLive;
