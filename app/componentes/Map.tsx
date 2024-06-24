import React, { useState} from "react";
import BuildingGrid from "./building/BuildingGrid";
import Resources from "./Resources";
import { PartidaType, TerrenoType } from "../models/partidas";
import { EdificioType } from "../models/edificios";
import BuildingMenu from "./building/BuildingMenu";
import LogoutButton from "./ui/LogoutButton";
import BuildingEdif from "./building/BuildingEdif";
import BuildingMensajes from "./building/BuildingMensajes";
import Button from "./ui/Button";
import BarContainer from "./ui/BarContainer";
import BuildingVisit from "./building/BuildingVisit";
import { UsuarioType } from "@/app/models/usuarios";
import { fetchSave } from "../services/partida-seleccionada";
import MapVisit from "./building/MapVisit";
import { EdificioTerrenoType } from "../models/partidas";
interface MapProps {
  recursos: PartidaType['recursos'];
  edificios: EdificioType[] ;
  onRecursosUpdate : (updatedRecursos : PartidaType['recursos']) => void;
  partida: number;
  buildingImages: string[] | null; // Agregar prop para las imágenes de los edificios
  terreno :TerrenoType | null;
}

const Map: React.FC<MapProps> = ({buildingImages,
   recursos, 
   edificios,
    onRecursosUpdate, 
    partida,
    terreno,
  }) => {
  const [showBuildMenu, setShowBuildMenu] = useState(false);
  const [indiceTerreno, setIndiceTerreno] = useState<number>(0);
  const [showBuildEdif, setShowBuildEdif] = useState(false);
  const [showMessages, setShowMessages] = useState(false); // Estado para controlar la visibilidad de BuildingMensajes
  const [showVisit, setShowVisit] = useState(false);
  const [visitUserBuildings, setVisitUserBuildings] = useState<string[] | null>(null);
  const [showVisitBuildings, setShowVisitBuildings] = useState(false); 

  const handleEmptyGroundClick = (index: number) => {
    setShowBuildMenu(true);
    setIndiceTerreno(index);
    //console.log(index)
  };

  const handleBuiltGroundClick = (index: number) => {
    //console.log('ffddyh')
    setIndiceTerreno(index);
    //console.log(indiceTerreno)
    setShowBuildEdif(true);

  };


  const handleItemClick = (index: number) => {
    // setShowConstruir(true);
    // setSelectedBuilding(edificios[index]);
    // setShowBuildingEdif(true);
  };

  const hideBuildMenu = () => {
    setShowBuildMenu(false)
  }

  const hideBuildEdif = () => {
    setShowBuildEdif(false)
  }

  const toggleMessages = () => {
    setShowMessages(!showMessages);
  };

  // const hideBuildingVisit = () => {
  //   setShowVisit(!showVisit);
  // };

  const handleVisitClick = async (userId: number) => {
    try {
      const userSave: PartidaType | null = await fetchSave(userId); // Obtener los datos del usuario seleccionado
      //console.log(userSave?.terreno)
  
      if (userSave && userSave.terreno) {
        // Mapear los IDs de los edificios del terreno del usuario a imágenes de edificios
        const newBuildingImages: string[] = Object.keys(userSave.terreno).map(key => {
          // Aseguramiento de tipo para saveData.terreno[key]
        const edificioTerreno = userSave.terreno[key] as EdificioTerrenoType;
        const buildingId = edificioTerreno.edificio_id;
        const edificio = edificios?.find(edificio => edificio.id === buildingId);
        //console.log(edificio);
        //console.log(edificio?.niveles);
        if (edificio && edificio.niveles && edificio.niveles[edificioTerreno.edificio_nivel]) {
          const imagenEdif = edificio.niveles[edificioTerreno.edificio_nivel].imagen;
          return imagenEdif ? imagenEdif : ''
        } else {
          return ''
        }
      });
  
        setVisitUserBuildings(newBuildingImages); // Actualizar el estado con las imágenes de los edificios del usuario visitado
        console.log(newBuildingImages)
        //setShowVisit(true);

      } else {
        setVisitUserBuildings([]); // Si no hay terreno o datos del usuario, establecer imágenes de edificios vacías
      }
  
      setShowVisit(false); // Cerrar la vista de selección de usuario después de completar la operación
      setShowVisitBuildings(true);
    } catch (error) {
      console.error('Error al procesar la visita al usuario:', error);
      // Manejo de errores aquí
    }
  };

  const hideVisitMap = () => {
    setShowVisitBuildings(false)
  }
  
  

  return (
    <main className="h-screen w-screen flex flex-col bg-cover" style={{ backgroundImage: "url('/images/background.png')" }}>
      <div className="flex justify-between">
        <BarContainer className="flex justify-center items-center w-1/2">
          <Resources items={recursos} />
        </BarContainer>
        <BarContainer className="flex justify-end items-center w-1/2">
          <div className="flex flex-row w-full">
            <img src="/elements/titulo.png" className="h-10" />
            <Button
              onClick={toggleMessages}
              className="text-gray-900 font-black mx-4 p-2"
              text="Mensajes"
            />
             <Button
              onClick={() => setShowVisit(true)} // Mostrar BuildingVisit al hacer clic en Visit
              className="text-gray-900 font-black mx-4 p-2"
              text="Visit"
            />
            <LogoutButton />
          </div>
        </BarContainer>
      </div>
      <div className="flex flex-1 flex-col justify-end items-center relative">
        {showMessages ? (
          <BuildingMensajes />
        ) : showVisit ? (
          <BuildingVisit onVisit={handleVisitClick} />
        ) : (
          <BuildingGrid
            buildingImages={buildingImages}
            onEmptyGroundClick={handleEmptyGroundClick}
            onBuildGroundClick={handleBuiltGroundClick}
          />
        )}
        <div className="h-24 w-full bg-ground-color p-4"></div>
        {showBuildMenu && (
          <div className="absolute top-0 w-full flex justify-center mt-5">
            <div className="w-1/2">
              <BuildingMenu
                buildingImages={buildingImages}
                indiceTerreno={indiceTerreno}
                edificios={edificios}
                onRecursosUpdate={onRecursosUpdate}
                hideMenu={hideBuildMenu}
                partidaRecursos={recursos}
                partidaJugadorId={partida}
              />
            </div>
          </div>
        )}
        {showBuildEdif && (
          <div className="absolute top-0 w-full flex justify-center mt-5">
            <BuildingEdif
              indiceTerreno={indiceTerreno}
              terreno={terreno}
              edificios={edificios}
              recursos={recursos}
              partidaJugadorId={partida}
              hideMenu={() => setShowBuildEdif(false)}
              buildingImages={buildingImages}
            />
          </div>
        )}
        {showVisitBuildings && visitUserBuildings && (
          <div className="absolute top-0 w-1/3 justify-center ">
          <MapVisit buildingImages={visitUserBuildings} hideMap={hideVisitMap}/>
          </div>
        )}
      </div>
    </main>
  );
};

export default Map;