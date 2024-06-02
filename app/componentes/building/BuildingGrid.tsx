// BuildingGrid.tsx
import React, { useState, useEffect, Key } from "react";
import { EdificioType } from "@/app/models/edificios";
import { fetchSave } from "@/app/services/partida-seleccionada";
import { useBuildingImages } from "@/app/hook/edficiosConQuery";

interface Props {
  onEmptyGroundClick: (index: number) => void;
  edificios : EdificioType[];
  onBuildGroundClick: (index: number) => void;
}

const BuildingGrid: React.FC<Props> = ({onEmptyGroundClick, edificios, onBuildGroundClick}) => {
  // const [edificiosPartida, setEdificiosPartida] = useState<EdificioType[]>([]); 
  // const [terreno, setTerreno] = useState<Record<string, number>>({});
  // const [buildingImages, setBuildingImages] = useState<string[]>([])
  // const [terrenoBool, setTerrenoBool] = useState<Record<string, boolean>>({});
  const buildingImages = useBuildingImages().buildingImages;

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
          className="h-48 w-48 bg-white bg-cover bg-opacity-0 cursor-pointer hover:bg-opacity-30"
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
        ></div>
      ))}
    </div>
  );
};

export default BuildingGrid;


//import Partidas, { PartidaType } from "@/app/models/partidas";
//import { getEdificioList } from "../../services/edificios-menu";
//import baseimage from '../images/placeholders/base_ph.png'
//import vacioimage from '../../public/placeholders/empty_ground_ph.png'
//import { StaticImageData } from "next/image";


  // useEffect(() => {
  //   const fetchPartidaActual = async () => {
  //     try {
  //       const data = await fetchSave(1000);
  //       const terreno = data?.terreno;
  //       if (terreno && typeof terreno === 'object') {
  //         setTerreno(terreno);
  //         const newBuildingImages = [];
  //         //const newTerrenoBool: Record<string, boolean> = {};
  //         for (const key in terreno) {
  //           if(Object.prototype.hasOwnProperty.call(terreno, key)) {
  //             //console.log(key)
  //             //console.log(terreno[key])
  //             const element = terreno[key];
  //             const edificio = edificios.find(edificio => edificio.id === element);
  //             if (edificio) {
  //               newBuildingImages.push(edificio.imagen);
  //               //console.log(newBuildingImages)
  //               terrenoBool[key] = true;
  //             }else{
  //               newBuildingImages.push('');
  //               terrenoBool[key] = false;
  //             }
  //             //console.log(terrenoBool)
  //           } 
  //         }
  //         setBuildingImages(newBuildingImages);
  //         setTerrenoBool(terrenoBool);
          
          
  //       } else {
  //         setTerreno({});
  //         setBuildingImages([]);
  //         setTerrenoBool({});
  //       }       
      
  //       }catch (error) {
  //       console.error("Error al cargar los datos de la partida:", error);
  //     }
  //   };
  //   fetchPartidaActual();
  // }, [edificios]);
