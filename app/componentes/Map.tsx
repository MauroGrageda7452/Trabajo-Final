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
  edificios: EdificioType[];
  onRecursosUpdate : (updatedRecursos : PartidaType['recursos']) => void;
}

const Map: React.FC<MapProps> = ({recursos, edificios,onRecursosUpdate}) => {
  //const [buildingImages, setBuildingImages] = useState<string[]>(Array.from({ length: 5 }, () => ''));
  const [showBuildMenu, setShowBuildMenu] = useState(false);
  const [showConstruir, setShowConstruir] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<EdificioType>();
  const [selectedGround, setSelectedGround] = useState<number>();
  const [indiceTerreno, setIndiceTerreno] = useState<number>(0);
  const [showBuildingEdif, setShowBuildingEdif] = useState(false);

  //console.log(edificios[1].name)
  useEffect(() => {
    const fetchAndGenerateResources = async () => {
      // Verificamos que los índices de los edificios existen antes de acceder a `nivel`
      if (edificios[1] && edificios[2] && edificios[3]) {
        //console.log(edificios[1].nivel)
        await Promise.all([
          //console.log(edificios[3].name),
          generarRecursosAgua(1000, edificios[1].nivel),
          generarRecursosComida(1000, edificios[2].nivel),
          generarRecursosChatarra(1000, edificios[3].nivel)
        ]);
      }else{
        //console.log("no funcaaaaaa")
        //console.log(edificios[1].name)
      }
    };

    fetchAndGenerateResources();
  }, [edificios]);
  
  const handleEmptyGroundClick = (index: number) => {
    setShowBuildMenu(true);
    setSelectedGround(index);
    setIndiceTerreno(index);
    setShowBuildingEdif(false);
    
  };

  const handleBuiltGroundClick = (index: number) => {
    //console.log('ffddyh')
    setShowBuildMenu(false);
    setSelectedGround(index);
    setIndiceTerreno(index);
    setSelectedBuilding(edificios[index]);
    setShowBuildingEdif(true);
    console.log('ffddyh')
    
  };

  const handleItemClick = (index: number) => {
    setShowConstruir(true);
    setSelectedBuilding(edificios[index]);
    setShowBuildingEdif(true);
  };

  const handleConstruirClick = (index: number) => {
    setShowConstruir(false);
    setShowBuildMenu(false);
  };
  

  
  return (
    <main>
    <div className="h-screen w-screen flex flex-col bg-cover" style={{ backgroundImage: "url('/images/background.png')", backgroundPosition: "center top -85px" }}>
      <div className="flex justify-start items-start bg-black">
        <Resources items={recursos} />
      </div>
      <div className="flex flex-1 flex-col justify-end items-center relative">
        <BuildingGrid edificios={edificios} onEmptyGroundClick={handleEmptyGroundClick} onBuildGroundClick={handleBuiltGroundClick} />
        <div className="h-40 w-screen flex relative">
          {showBuildMenu &&  (
            <div className="absolute top-0 w-full">
              <div className="w-1/2">
                <BuildingMenu indiceTerreno={indiceTerreno} playerId={1000} edificios={edificios} onRecursosUpdate={onRecursosUpdate} onItemClick={handleItemClick} />
                {showConstruir && (
                  <div className="flex flex-row justify-end items-end">
                    <Button onClick={() => handleConstruirClick(selectedGround || 0)} text={"Construir"} className="bg-green-600 mr-1" />
                    <Button onClick={() => setShowBuildMenu(false)} text={"Cancelar"} className="bg-red-600 mr-2" />
                  </div>
                )}
              </div>
            </div>
          )}
          {showBuildingEdif &&  (
            <div className="absolute top-0 w-full">
              <BuildingEdif edificios={edificios} recursos={recursos} />
              </div>
            )}
        </div>
      </div>
    </div>
  </main>
);
};
export default Map;
