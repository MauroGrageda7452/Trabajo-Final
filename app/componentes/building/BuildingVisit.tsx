import React, { useState, useEffect } from "react";
import { UsuarioType } from "@/app/models/usuarios"; // Ajusta esta importación según tu estructura de archivos
import Button from "../ui/Button"; // Asegúrate de que la ruta a tu botón es correcta
import { getUsuarioList } from "@/app/services/users";
import Cookies from 'js-cookie';

interface BuildingVisitProps {
  onVisit: (userId: number) => void;
}

const BuildingVisit: React.FC<BuildingVisitProps> = ({ onVisit }) => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [usuarios, setUsuarios] = useState<UsuarioType[] | null>(null);
  const userId = parseInt(Cookies.get('userId') || '0'); // Obtener y convertir el ID del usuario de las cookies a un número

  const handleUserClick = (userId: number) => {
    setSelectedUser(userId);
  };

  const handleVisitClick = () => {
    if (selectedUser !== null) {
      onVisit(selectedUser); // Pasar el ID del usuario seleccionado al componente padre
    }
  };

  useEffect(() => {
    console.log("ID del usuario logueado:", userId); // Aquí se imprime el ID del usuario logueado

    async function fetchUsuarios() {
      const users = await getUsuarioList();
      if (users) {
        // Filtrar la lista de usuarios para excluir al usuario actual
        const filteredUsers = users.filter(user => user.id !== userId);
        setUsuarios(filteredUsers);
      }
    }
    fetchUsuarios();
  }, [userId]);

  return (
    <div className="container mx-auto p-4 grid grid-cols-3 gap-4 mt-4">
      {/* Panel Izquierdo */}
      <div className="w-1/2 bg-gray-200 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Usuarios</h2>
        <div className="space-y-2 overflow-y-auto">
          {(usuarios || []).map((usuario) => (
            <div
              key={usuario.id}
              onClick={() => handleUserClick(usuario.id)}
              className={`p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 text-gray-900 ${selectedUser === usuario.id ? "bg-gray-300" : ""}`}
            >
              {usuario.username}
            </div>
          ))}
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col justify-end items-end p-4">
        <div className="ml-auto"> {/* Utilizamos ml-auto para alinear el contenido a la derecha */}
          <Button
            onClick={handleVisitClick}
            className="text-white bg-blue-600 p-4 rounded-md"
            text="Visitar"
          />
        </div>
      </div>
    </div>
  );
};

export default BuildingVisit;