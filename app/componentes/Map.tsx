// export default Map;
import React, { useEffect, useState } from "react";
import BuildingGrid from "./building/BuildingGrid";
import BuildingMenu from "./building/BuildingMenu";
import BuildingEdif from "./building/BuildingEdif";
import Resources from "./Resources";
import Button from "./ui/Button";
//import { getEdificioList } from "../services/edificios-menu";
import { PartidaType } from "../models/partidas";
import { EdificioType } from "../models/edificios";
//import { actualizarRecursoJugador } from "../services/recursos";
import { generarRecursosAgua } from "./Edificios-funcional/pozo-fun";
import { generarRecursosComida } from "./Edificios-funcional/criadero-fun";
import { generarRecursosChatarra } from "./Edificios-funcional/chatarreria-fun";
interface MapProps {
  recursos: PartidaType['recursos'];
  edificios: EdificioType[] ;
  onRecursosUpdate : (updatedRecursos : PartidaType['recursos']) => void;
}

const Map: React.FC<MapProps> = ({recursos, edificios,onRecursosUpdate}) => {
  const [buildingImages, setBuildingImages] = useState<string[]>(Array.from({ length: 5 }, () => ''));
  const [showBuildMenu, setShowBuildMenu] = useState(false);
  const [showConstruir, setShowConstruir] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<EdificioType>();
  const [selectedGround, setSelectedGround] = useState<number>();
  const [indiceTerreno, setIndiceTerreno] = useState<number>(0);
  const [showProduction, setshowProduction,] = useState(false);

  const nivelAgua = 1; // Nivel del edificio de agua
  const nivelComida = 1; // Nivel del edificio de comida
  const nivelChatarra = 1; // Nivel del edificio de chatarra

  useEffect(() => {
    const fetchAndGenerateResources = async () => {
      await Promise.all([
        generarRecursosAgua(1000, nivelAgua),
        generarRecursosComida(1000, nivelComida),
        generarRecursosChatarra(1000, nivelChatarra)
      ]);
    };
  
    fetchAndGenerateResources();
  }, []);
  
  const handleEmptyGroundClick = (index: number) => {
    setShowBuildMenu(true);
    setSelectedGround(index);
    setIndiceTerreno(index);
    
  };

  const handleBuiltGroundClick = (index: number) => {
    console.log('ffddyh')
    setShowBuildMenu(false);
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
    // setshowProduction(true);
  };
  

  
  return (
    <main>
      <div className="h-screen w-screen flex flex-col bg-cover" style={{ backgroundImage: "url('/images/background.png')", backgroundPosition: "center top -85px" }}>
        <div className="flex justify-start items-start bg-black">
          <Resources items={recursos} />
        </div>
        <div className="flex flex-1 flex-col justify-end items-center relative">
          <BuildingGrid   edificios={edificios} onEmptyGroundClick={handleEmptyGroundClick} 
          onBuildGroundClick={handleBuiltGroundClick}/>
          <div className="h-40 w-screen flex relative">
            {/* Imagen de starcraf2 
            <img src="/placeholders/marco-starcraft2-png.png" alt="marco de abajo" className="w-full h-48" /> */}
            {/* Contenedor de la imagen y la parte superior de BuildingMenu */}
            {showBuildMenu && (
              <div className="absolute top-0 w-full">
                <div className="w-1/2 ">
                  <BuildingMenu  indiceTerreno={indiceTerreno}playerId={1000}  edificios={edificios} onRecursosUpdate={onRecursosUpdate}onItemClick={handleItemClick} />
                  {showConstruir && (
                    <div className="flex flex-row justify-end items-end">
                      <Button onClick={() => handleConstruirClick(selectedGround || 0)} text={"Construir"} className="bg-green-600 mr-1"/>
                      <Button onClick={() => setShowBuildMenu(false)} text={"Cancelar"} className="bg-red-600 mr-2"/>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="absolute top-0 w-full">
            <div className="w-1/2 ">
              <BuildingEdif edificios={edificios} onBuildGroundClick={handleBuiltGroundClick}/>
            </div>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Map;
