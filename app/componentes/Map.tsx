import React, { useState } from "react";
import BuildingGrid from "./building/BuildingGrid";
import Resources from "./Resources";
import Button from "./ui/Button";
//import baseimg from "../public/placeholders/base_ph.png"
import { getEdificioList } from "../services/edificios-menu";
import { PartidaType } from "../models/partidas";
import { EdificioType } from "../models/edificios";
import BuildingMenu from "./building/BuildingMenu";
import { actualizarRecursoJugador } from "../services/recursos";
import Link from "next/link";
import LogoutButton from "./ui/LogoutButton"

interface MapProps {
  recursos: PartidaType['recursos'];
  edificios: EdificioType[] ;
  onRecursosUpdate : (updatedRecursos : PartidaType['recursos']) => void;
  partida: number;
  buildingImages: string[] | null; // Agregar prop para las imágenes de los edificios
}

const Map: React.FC<MapProps> = ({buildingImages, recursos, edificios, onRecursosUpdate, partida}) => {
  const [showBuildMenu, setShowBuildMenu] = useState(false);
  const [indiceTerreno, setIndiceTerreno] = useState<number>(0);
  
  const handleEmptyGroundClick = (index: number) => {
    setShowBuildMenu(true);
    setIndiceTerreno(index);
  };

  const handleBuiltGroundClick = (index: number) => {
    console.log('ffddyh')
    setIndiceTerreno(index);
  };


  const handleItemClick = (index: number) => {
    // setShowConstruir(true);
    // setSelectedBuilding(edificios[index]);
    // setShowBuildingEdif(true);
  };

  const hideBuildMenu = () => {
    setShowBuildMenu(false)
  }

  return (
    <main className="h-screen w-screen flex flex-col bg-cover" style={{ backgroundImage: "url('/images/background.png')" }}>
      <div className="flex justify-between items-start bg-black p-1 ">
        <Resources items={recursos} />
        <LogoutButton />
      </div>
      <div className="flex flex-1 flex-col justify-end items-center relative">
        <BuildingGrid buildingImages={buildingImages} 
            onEmptyGroundClick={handleEmptyGroundClick} onBuildGroundClick={handleBuiltGroundClick}
            />
        <div className="h-24 w-full bg-ground-color p-4">
          {/* Contenedor de la imagen y la parte superior de BuildingMenu */}
          {showBuildMenu && (
            <div className="absolute top-0 w-full flex justify-center">
              <div className="w-1/2">
                <BuildingMenu buildingImages={buildingImages} indiceTerreno={indiceTerreno} /*playerId={partida}*/
                 edificios={edificios} onRecursosUpdate={onRecursosUpdate} hideMenu={hideBuildMenu} 
                partidaRecursos={recursos} partidaJugadorId={partida}/*onItemClick={handleItemClick} *//> 
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Map;




  /*const handleItemClick = (index: number) => {
    //setShowConstruir(true);
    setSelectedBuilding(edificios[index]);
  };*/

  /*const handleConstruirClick = (index: number) => {
  //   const newBuildingImages = [...buildingImages];
  //   newBuildingImages[1] = '/placeholders/base_ph.png';
  //   const selectedImage = selectedBuilding?.imagen || null;
  //   if (selectedImage !== null && index !== 1){
  //     newBuildingImages[index] = selectedImage;
  //     setBuildingImages(newBuildingImages);
  //   }
  //   // if(selectedBuilding){
  //   //   const updatedPartida = await actualizarRecursoJugador({name:"chatarra ", cantidad:selectedBuilding.costoRecursoscreacion})
  //   // }
    setShowConstruir(false);
    setShowBuildMenu(false);
  };*/