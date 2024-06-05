import BuildingGrid from "./building/BuildingGrid";
import Resources from "./Resources";
import Button from "./ui/Button";
// import edificios, { EdificioType } from "../models/edificios";
import BuildingMenu from "./building/BuildingMenu";
import { useEdificios } from "../hook/edficiosConQuery";
import { EdificioType } from "../models/edificios";
import { useCallback, useEffect, useRef , useState} from "react";
import { calculateTimeForBuildingPozo, generarRecursosAgua } from "./Edificios-funcional/pozo-fun";
import { useQueryClient } from "@tanstack/react-query";
import { fetchSave } from "../services/partida-seleccionada";
import { calculateTimeForBuildingCriadero, generarRecursosCriadero } from "./Edificios-funcional/criadero-fun";
import { calculateTimeForBuildingChatarra, generarRecursosChatarra } from "./Edificios-funcional/chatarreria-fun";
// import Link from "next/link";
import LogoutButton from "./ui/LogoutButton";
interface MapProps {
  partidaJugadorId : number | null
}

const Map: React.FC<MapProps> = ({partidaJugadorId}) => {
  const [showBuildMenu, setShowBuildMenu] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<EdificioType>();
  const [selectedGround, setSelectedGround] = useState<number>();
  const [indiceTerreno, setIndiceTerreno] = useState<number>(0);
  //const [userId, setUserId] = useState <number | null>(1004);

  if (partidaJugadorId !== null){
  //   setUserId(partidaJugadorId);
  // }else {
  //setUserId(1004);
  // }
  // const queryClient = useQueryClient();
  // const intervalRefs = useRef<(NodeJS.Timeout | number)[]>([]);
  // //setUserId(1004);


  // const startResourceGeneration = useCallback(async () => {
  //     //if (userId !== null) {
  //     const partida = await fetchSave(partidaJugadorId);
  //       if (!partida || !partida.terreno) return;

  //       for (const key in partida.terreno) {
  //         const edificioId = partida.terreno[key];
  //         //console.log(edificioId)
  //         if (edificioId === 1) {
  //           const intervalId = setInterval(async () => {
  //             await generarRecursosAgua(partidaJugadorId, 3); // Nivel 3 como ejemplo
  //             queryClient.invalidateQueries({ queryKey: ['recursos'] });
  //           }, calculateTimeForBuildingPozo(3));
  //           intervalRefs.current.push(intervalId);
  //         }else if (edificioId === 2 ){
  //           const intervalId = setInterval(async () => {
  //             await generarRecursosCriadero(partidaJugadorId, 3); // Nivel 3 como ejemplo
  //             queryClient.invalidateQueries({ queryKey: ['recursos'] });
  //           }, calculateTimeForBuildingCriadero(3));
  //           intervalRefs.current.push(intervalId);
            
  //         }else if (edificioId === 3){
  //           const intervalId = setInterval(async () => {
  //             await generarRecursosChatarra(partidaJugadorId, 3); // Nivel 3 como ejemplo
  //             queryClient.invalidateQueries({ queryKey: ['recursos'] });
  //           }, calculateTimeForBuildingChatarra(3));
  //           intervalRefs.current.push(intervalId);
  //         }
        
  //   }

  // }, [queryClient]);

  // useEffect(() => {
  //   startResourceGeneration();
  //   //console.log(partidaJugadorId)
  //   return () => {
  //     // Clear all intervals when the component unmounts
  //     intervalRefs.current.forEach(interval => clearInterval(interval as number));
  //   };
  // }, [startResourceGeneration]);


  //const edificios = useEdificios().edificiosData;
  
  const handleEmptyGroundClick = (index: number) => {
    setShowBuildMenu(true);
    setSelectedGround(index);
    setIndiceTerreno(index);
    
  };

  const handleBuiltGroundClick = (index: number) => {
    console.log('ffddyh')
    //setShowBuildMenu(false);
    setSelectedGround(index);
    setIndiceTerreno(index);
  };

  const hideBuildMenu = () => {
    setShowBuildMenu(false);
  }

  const handleItemClick = (index: number) => {
    //if (edificios) {setSelectedBuilding(edificios[index]);}
  };

  

  
  return (
    <main>
      <div className="h-screen w-screen flex flex-col bg-cover" style={{ backgroundImage: "url('/images/background.png')", backgroundPosition: "center top -85px" }}>
        <div className="flex justify-start items-start bg-black p-1">
          <Resources playerId={partidaJugadorId}/> 
          <LogoutButton/>
        </div>
        <div className="flex flex-1 flex-col justify-end items-center relative">
          <BuildingGrid  playerId= {partidaJugadorId} onEmptyGroundClick={handleEmptyGroundClick} onBuildGroundClick={handleBuiltGroundClick}/> 
          <div className="h-40 w-screen flex relative">
            {/* Imagen de starcraf2 
            <img src="/placeholders/marco-starcraft2-png.png" alt="marco de abajo" className="w-full h-48" /> */}
            {/* Contenedor de la imagen y la parte superior de BuildingMenu */}
            {showBuildMenu && (
              <div className="absolute top-0 w-full">
                <div className="w-1/2 ">
                  <BuildingMenu  indiceTerreno={indiceTerreno}playerId={partidaJugadorId}  onItemClick={handleItemClick} hideMenu={hideBuildMenu}/>
                  {/* {showConstruir && (
                    <div className="flex flex-row justify-end items-end">
                      <Button onClick={() => handleConstruirClick(selectedGround || 0)} text={"Construir"} className="bg-green-600 mr-1"/>
                      <Button onClick={() => setShowBuildMenu(false)} text={"Cancelar"} className="bg-red-600 mr-2"/>
                    </div>
                  )} */}
                  
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
  }
};

export default Map;
