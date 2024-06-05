// BuildingGrid.tsx
import React, { useState, useEffect} from "react";
import { EdificioType } from "@/app/models/edificios";
import { fetchSave } from "@/app/services/partida-seleccionada";
import { PartidaType } from "@/app/models/partidas";
//import Partidas, { PartidaType } from "@/app/models/partidas";
//import { getEdificioList } from "../../services/edificios-menu";
//import baseimage from '../images/placeholders/base_ph.png'
//import vacioimage from '../../public/placeholders/empty_ground_ph.png'
//import { StaticImageData } from "next/image";



interface Props {
  onEmptyGroundClick: (index: number) => void;
  edificios : EdificioType[];
  onBuildGroundClick: (index: number) => void;
  partidaJugadorId: number;
  buildingImages: string[] | null;
  onBuildingUpdate: (buildingImages: string[]) => void
}

const BuildingGrid: React.FC<Props> = ({onEmptyGroundClick,buildingImages, edificios, onBuildGroundClick, partidaJugadorId}) => {
  const [edificiosPartida, setEdificiosPartida] = useState<EdificioType[]>([]); 
  const [terreno, setTerreno] = useState<Record<string, number>>({});
  //const [buildingImages, setBuildingImages] = useState<string[]>([])
  const [terrenoBool, setTerrenoBool] = useState<Record<string, boolean>>({});

  // useEffect(() => {
  //   const fetchPartidaEdificios = async () => {
  //     try {
  //       const data = await fetchSave(partidaJugadorId);
  //       const terreno = data?.terreno;
  //       if (terreno && typeof terreno === 'object') {
  //         setTerreno(terreno);
  //         const newBuildingImages = [];
  //         //const newTerrenoBool: Record<string, boolean> = {};
  //         for (const key in terreno) {
  //           if(Object.prototype.hasOwnProperty.call(terreno, key)) {
              
  //             const element = terreno[key];
  //             const edificio = edificios.find(edificio => edificio.id === element);
  //             if (edificio) {
  //               newBuildingImages.push(edificio.imagen);
  //               terrenoBool[key] = true;
  //             }else{
  //               newBuildingImages.push('');
  //               terrenoBool[key] = false;
  //             }
  //           } 
  //         }
  //         onBuildingUpdate(newBuildingImages); // Update the buildingImages state in Map
  //         setTerrenoBool(terrenoBool);
          
          
  //       } else {
  //         setTerreno({});
  //         onBuildingUpdate([]);
  //         setTerrenoBool({});
  //       }       
      
  //       }catch (error) {
  //       console.error("Error al cargar los datos de la partida:", error);
  //     }
  //   };
  //   fetchPartidaEdificios();
  // }, [edificios]);

  const getImageStyle = (imageUrl: string) => ({
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center bottom', 
    backgroundRepeat: 'no-repeat',
  });

  return (
    <div className="flex flex-row">
      {buildingImages?.map((imageUrl, index) => (
        <div
          key={index}
          style={getImageStyle(imageUrl)}
          className="h-64 w-64 bg-white bg-cover bg-opacity-0 cursor-pointer hover:bg-opacity-20"
          onClick={() => {
            //const key = index.toString();
            //console.log(terrenoBool[index])
            if (buildingImages[index] !== '') {
              //console.log(terrenoBool[key])
              onBuildGroundClick(index);
            } else {
              //console.log(terrenoBool)
              //onBuildGroundClick(index);
              onEmptyGroundClick(index);
            }
          }}
        >{index}</div>
      ))}
    </div>
  );
};

export default BuildingGrid;
// function onBuildingUpdate(newBuildingImages: string[]) {
//   throw new Error("Function not implemented.");
// }

