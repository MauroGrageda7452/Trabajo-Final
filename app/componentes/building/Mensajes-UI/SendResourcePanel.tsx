import React, { useState } from "react";
import { UsuarioType } from "@/app/models/usuarios";

interface SendResourcesPanelProps {
    usuarios: UsuarioType[];
    onSendResources: (userId: number, resource: string, quantity: number, jugadorEnviadorId : number) => void;
    playerId :string | undefined;
}

const SendResourcesPanel: React.FC<SendResourcesPanelProps> = ({ 
    usuarios, 
    onSendResources,
    playerId
}) => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedResource, setSelectedResource] = useState<string>("agua");
  const [quantity, setQuantity] = useState<number>(0);

  const handleSendResources = () => {
    if (selectedUser !== null && quantity > 0) {
      onSendResources(selectedUser, selectedResource, quantity, Number(playerId));
      //actualizarRecursoJugadorRestar(Number(playerId))
    }
  };

  return (
    <div className="bg-gray-300 p-4 rounded-lg flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Enviar Recursos</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Seleccionar Usuario:</label>
        <select
          value={selectedUser || ""}
          onChange={(e) => setSelectedUser(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="" disabled>
            Seleccione un usuario
          </option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.username}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Seleccionar Recurso:</label>
        <select
          value={selectedResource}
          onChange={(e) => setSelectedResource(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="agua">Agua</option>
          <option value="comida">Comida</option>
          <option value="chatarra">Chatarra</option>
          <option value="trabajadores">Trabajadores</option>
        </select>
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4">Cantidad:</label>
        <button
          onClick={() => setQuantity((prev) => Math.max(prev - 1, 0))}
          className="p-2 bg-green-500 rounded-lg text-black"
        >
          -
        </button>
        <span className="mx-4 text-lg">{quantity}</span>
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="p-2 bg-green-500 rounded-lg text-black"
        >
          +
        </button>
      </div>
      <button
        onClick={handleSendResources}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Enviar Recursos
      </button>
    </div>
  );
};

export default SendResourcesPanel;