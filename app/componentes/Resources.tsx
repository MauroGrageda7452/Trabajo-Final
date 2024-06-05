
// Resources.tsx
import React from "react";
import { PartidaType } from "../models/partidas";

// interface Recurso {
//   id: number;
//   name: string;
//   cantidad: number;
// }

// interface Props {
//   items: Recurso[];
// }

type ResourcesProps = {
  items: PartidaType['recursos'];
};


const Resources: React.FC<ResourcesProps> = ({ items }) => {
  return (
    <div className="p-4 text-white">
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <span>Agua:</span>
          <span>{items?.agua_jugador}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Comida:</span>
          <span>{items?.comida_jugador}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Chatarra:</span>
          <span>{items?.chatarra_jugador}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Trabajadores:</span>
          <span>{items?.trabajadores_jugador}</span>
        </div>
      </div>
    </div>
  );
};

export default Resources;
