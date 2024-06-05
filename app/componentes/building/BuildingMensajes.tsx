import { UsuarioType } from "@/app/models/usuarios";
import React, { useState } from "react";

interface Props {
  usuario: UsuarioType[];
}

const BuildingMensajes: React.FC<Props> = ({ usuario }) => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [messageTitle, setMessageTitle] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");

  const handleSendMessage = () => {
    // Aquí agregarías la lógica para enviar el mensaje
    console.log("Mensaje enviado a:", selectedUser);
    console.log("Título:", messageTitle);
    console.log("Texto:", messageText);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mensajes</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Seleccionar Usuario:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
        >
          <option value="">Seleccionar</option>
          {usuario.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Título del Mensaje:</label>
        <input
          type="text"
          value={messageTitle}
          onChange={(e) => setMessageTitle(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Texto del Mensaje:</label>
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
        />
      </div>
      <button
        onClick={handleSendMessage}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Enviar Mensaje
      </button>
    </div>
  );
};

export default BuildingMensajes;
