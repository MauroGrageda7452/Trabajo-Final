
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

type ConsolaProps = {
  nombre: string;
  cantidad: number | undefined;
};

const Consola: React.FC<ConsolaProps> = ({ nombre, cantidad }) => {
  return <div className="relative p-2 text-green-500"/*style={getImageStyle('/elements/boton.jpg')}*/>
          <img src='/elements/consola-bar.jpg' className="absolute h-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="center" />
          <img src='/elements/consola-bar-izq.jpg' className="absolute h-full left-0 top-1/2 transform -translate-y-1/2" alt="left" />
          <img src='/elements/consola-bar-der.jpg' className="absolute h-full right-0 top-1/2 transform -translate-y-1/2" alt="right" />
          <span className="relative pl-1 pr-1">{nombre}{cantidad}</span>
        </div>;
}


const Resources: React.FC<ResourcesProps> = ({ items }) => {
  return (
    <div className="p-4">
      <div className="flex space-x-2">
          <Consola nombre="Agua: " cantidad={items?.agua_jugador}/>
          <Consola nombre="Comida: " cantidad={items?.comida_jugador}/>
          <Consola nombre="Chatarra: " cantidad={items?.chatarra_jugador}/>
          <Consola nombre="Trabajadores: " cantidad={items?.trabajadores_jugador}/>
      </div>
    </div>
  );
};

export default Resources;
