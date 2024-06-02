// export default Map;
import React, { useEffect, useState } from "react";
//import { Recurso } from "../services/recursos";
//import { Edificio } from "../models/edificios";
//import BuildingMenu from "./building/BuildingMenu";
import BuildingGrid from "./building/BuildingGrid";
import Resources from "./Resources";
import Button from "./ui/Button";
//import baseimg from "../public/placeholders/base_ph.png"
import { getEdificioList } from "../services/edificios-menu";
import { PartidaType } from "../models/partidas";
import { EdificioType } from "../models/edificios";
import BuildingMenu from "./building/BuildingMenu";
import { actualizarRecursoJugador, getRecursoList } from "../services/recursos";
// import { useQuery } from '@tanstack/react-query';

interface MapProps {
  // recursos: PartidaType['recursos'];
  edificios: EdificioType[] ;
  // onRecursosUpdate : (updatedRecursos : PartidaType['recursos']) => void;
  //terrenoBool:  Record<string, boolean>;
}

const Map: React.FC<MapProps> = ({edificios}) => {
  const [buildingImages, setBuildingImages] = useState<string[]>(Array.from({ length: 5 }, () => ''));
  const [showBuildMenu, setShowBuildMenu] = useState(false);
  const [showConstruir, setShowConstruir] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<EdificioType>();
  const [selectedGround, setSelectedGround] = useState<number>();
  const [indiceTerreno, setIndiceTerreno] = useState<number>(0);
  
  // const recursos = useQuery({
  //   queryKey: ['recursosJuego'],
  //   queryFn: getRecursoList
  // });
  //const recursos;

  // useEffect(() => {
  //    //if (recursos.data){
  //      //onRecursosUpdate(recursos.data.agua_jugador);
  //    //}
  //    //console.log (recursos)
  // }, [recursos,onRecursosUpdate])

  // if (recursos) {
  //   // Puedes usar los datos aquí
  //   console.log(recursos);
  // }

  // console.log(recursos);

  const handleEmptyGroundClick = (index: number) => {
    setShowBuildMenu(true);
    setSelectedGround(index);
    setIndiceTerreno(index);
    
  };

  const handleBuiltGroundClick = (index: number) => {
    console.log('ffddyh')
    setSelectedGround(index);
    setIndiceTerreno(index);
    
  };

  const handleItemClick = (index: number) => {
    setShowConstruir(true);
    setSelectedBuilding(edificios[index]);
  };

  const handleConstruirClick = (index: number) => {
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
  };
  

  
  return (
    <main>
      <div className="h-screen w-screen flex flex-col bg-cover" style={{ backgroundImage: "url('/images/background.png')", backgroundPosition: "center top -85px" }}>
        <div className="flex justify-start items-start bg-black">
          {<Resources/> }
        </div>
        <div className="flex flex-1 flex-col justify-end items-center relative">
          {<BuildingGrid   edificios={edificios} onEmptyGroundClick={handleEmptyGroundClick} 
          onBuildGroundClick={handleBuiltGroundClick}/> }
          <div className="h-40 w-screen flex relative">
            {/* Imagen de starcraf2 
            <img src="/placeholders/marco-starcraft2-png.png" alt="marco de abajo" className="w-full h-48" /> */}
            {/* Contenedor de la imagen y la parte superior de BuildingMenu */}
            {showBuildMenu && (
              <div className="absolute top-0 w-full">
                <div className="w-1/2 ">
                  {<BuildingMenu  indiceTerreno={indiceTerreno}playerId={1000}  onItemClick={handleItemClick} />}
                  {showConstruir && (
                    <div className="flex flex-row justify-end items-end">
                      <Button onClick={() => handleConstruirClick(selectedGround || 0)} text={"Construir"} className="bg-green-600 mr-1"/>
                      <Button onClick={() => setShowBuildMenu(false)} text={"Cancelar"} className="bg-red-600 mr-2"/>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Map;
