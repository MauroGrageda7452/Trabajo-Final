// BuildingGrid.tsx
import React, { useState, useEffect, Key } from "react";
import { EdificioType } from "@/app/models/edificios";
import { fetchSave } from "@/app/services/partida-seleccionada";

interface Props {
  onEmptyGroundClick: (index: number) => void;
  edificios : EdificioType[];
  onBuildGroundClick: (index: number) => void;
}

const BuildingGrid: React.FC<Props> = ({onEmptyGroundClick, edificios, onBuildGroundClick }) => {
  const [edificiosPartida, setEdificiosPartida] = useState<EdificioType[]>([]); 
  //const [terreno, setTerreno] = useState<Record<string, number>>({});
  const [buildingImages, setBuildingImages] = useState<string[]>([])
  const [terrenoBool, setTerrenoBool] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchPartidaActual = async () => {
      try {
        const data = await fetchSave(1000);
        const terreno = data?.terreno;
        if (terreno && typeof terreno === 'object') {
          //setTerreno(terreno);
          const newBuildingImages = [];
          //const newTerrenoBool: Record<string, boolean> = {};
          for (const key in terreno) {
            if(Object.prototype.hasOwnProperty.call(terreno, key)) {
              //console.log(key)
              //console.log(terreno[key])
              const element = terreno[key];
              const edificio = edificios.find(edificio => edificio.id === element);
              if (edificio) {
                newBuildingImages.push(edificio.imagen);
                //console.log(newBuildingImages)
                //terrenoBool[key] = true;
              }else{
                newBuildingImages.push('');
                //terrenoBool[key] = false;
              }
              //console.log(terrenoBool)
            } 
          }
          setBuildingImages(newBuildingImages);
          setTerrenoBool(terrenoBool);
          
          
        } else {
          //setTerreno({});
          setBuildingImages([]);
          setTerrenoBool({});
        }       
      
        }catch (error) {
        console.error("Error al cargar los datos de la partida:", error);
      }
    };
    fetchPartidaActual();
  }, [edificios]);

  const getImageStyle = (imageUrl: string) => ({
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center bottom', 
    backgroundRepeat: 'no-repeat',
  });
  return (
    <div className="flex flex-row">
      {buildingImages.map((imageUrl, index) => (
        <div
          key={index}
          style={getImageStyle(imageUrl)}
          className="h-48 w-48 bg-white bg-cover bg-opacity-0 cursor-pointer hover:bg-opacity-30"
          onClick={() => {
            if (buildingImages[index] !== '') { // Aquí se verifica si el edificio está construido
              onBuildGroundClick(index);
            } else {
              onEmptyGroundClick(index);
            }
          }}
        ></div>
      ))}
    </div>
  );
};

export default BuildingGrid;
