import { fetchSave, updateSave } from "@/app/services/partida-seleccionada";
import { useBuildingImages, useEdificios } from "@/app/hook/edficiosConQuery";
// import { useRecursos } from "@/app/hook/recursosConQuery";
import { useConstruccion } from "@/app/hook/useConstruccion";
import { use, useState } from "react";
import Button from "../ui/Button";


interface Props {
  onItemClick: (index: number) => void;
  playerId: number; //para identificar al jugador
  // edificios: EdificioType[];
  // onRecursosUpdate: (updatedRecursos: { agua_jugador: number; comida_jugador: number; chatarra_jugador: number }) => void;
  indiceTerreno : number;
  //terrenoBool : Record<string, boolean>;
  hideMenu: () => void;
}

const BuildingMenu: React.FC<Props> = ({onItemClick, playerId, indiceTerreno,hideMenu}) => {
  
  const [showConstruir, setShowConstruir] = useState(false);
  const [showBuildMenu, setShowBuildMenu] = useState(false);
  // const [selectedGround, setSelectedGround] = useState<number>();
  const [terrenoId, setTerrenoId] = useState<number>();
  // const { recursosData, recursosLoading, recursosError, handleRecursosUpdate } = useRecursos();
  const { edificiosData, edificiosLoading, edificiosError } = useEdificios();
  //const {buildingImages, actualizarBuildingMutation} = useBuildingImages();
  const { handleConstruccion } = useConstruccion(playerId);
  

  const handleItemClick = async (index: number) => {
    //await handleConstruccion(index, () => onItemClick(index) );
    setTerrenoId(index);
    //setSelectedItemIndex(index);
    //setSelectedGround()
    setShowConstruir(true);
  }

  const handleConstruirClick = async (index: number) => {
    if (terrenoId && playerId)
    await handleConstruccion(terrenoId, () => onItemClick(terrenoId), playerId );    
    setShowConstruir(false);
    setShowBuildMenu(false);
    hideMenu();
  };
  
  return (
    <div className="p-5">
      {edificiosData?.map((edificiosData, index) => (
        <div
          key={edificiosData.id}
          className={`item-text bg-black cursor-pointer hover:bg-opacity-50 
          ${ terrenoId === index ? 'bg-blue-500' : 'bg-black'}
          `}
          
          onClick={() => handleItemClick(index)} // Aquí llamamos a la función handleItemClick en lugar de onItemClick directamente
        >
           {`${edificiosData.name} : ${edificiosData.descripcion}`}

        </div>
      ))}
        {showConstruir && (
                    <div className="flex flex-row justify-end items-end">
              <Button onClick={() => handleConstruirClick(terrenoId || 0)} text={"Construir"} className="bg-green-600 mr-1"/>
              <Button onClick={() => hideMenu()} text={"Cancelar"} className="bg-red-600 mr-2"/>
          </div>
        )}
    </div>
  );
};

export default BuildingMenu;
