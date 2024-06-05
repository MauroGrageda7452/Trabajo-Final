import React from "react";
import { UsuarioType } from "@/app/models/usuarios";

interface PanelIzquierdoProps {
  usuarios: UsuarioType[];
  onUserClick: (userId: number) => void;
}

const PanelIzquierdo: React.FC<PanelIzquierdoProps> = ({ usuarios, onUserClick }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Usuarios</h2>
      <div className="space-y-2">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            onClick={() => onUserClick(usuario.id)}
            className="p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 text-gray-900"
          >
            {usuario.username}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelIzquierdo;