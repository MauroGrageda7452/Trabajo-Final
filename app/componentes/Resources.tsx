
// Resources.tsx
import React from "react";
import { PartidaType } from "../models/partidas";
import { useRecursos } from "../hook/recursosConQuery";

interface Recurso {
  id: number;
  name: string;
  cantidad: number;
}

interface Props {
  items: Recurso[];
}
// interface ResourcesProps {
//   items: {
//     agua_jugador: number;
//     comida_jugador: number;
//     chatarra_jugador: number;
//   } | null;
// }

type ResourcesProps = {
  // items: PartidaType['recursos'] | null;
};


const Resources: React.FC = () => {
  // if (!items) {
  //   return <div>Error loading resources</div>;
  // }
  const {recursosData} = useRecursos();

  return (
    <div className="p-4 text-white">
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <span>Agua:</span>
          <span>{recursosData?.agua_jugador}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Comida:</span>
          <span>{recursosData?.comida_jugador}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Chatarra:</span>
          <span>{recursosData?.chatarra_jugador}</span>
        </div>
      </div>
    </div>
  );
};

export default Resources;
