// export default Map;
import React, { useState } from "react";
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
import { actualizarRecursoJugador } from "../services/recursos";
import Link from "next/link";
import LogoutButton from "./ui/LogoutButton";
import BuildingMensajes from "./building/BuildingMensajes";
import { UsuarioType } from "../models/usuarios";


interface MapProps {
  recursos: PartidaType['recursos'];
  edificios: EdificioType[] ;
  onRecursosUpdate : (updatedRecursos : PartidaType['recursos']) => void;
  partida: number;
  //terrenoBool:  Record<string, boolean>;
}

const Map: React.FC<MapProps> = ({recursos, edificios, onRecursosUpdate, partida}) => {
  const [buildingImages, setBuildingImages] = useState<string[]>(Array.from({ length: 5 }, () => ''));
  const [showBuildMenu, setShowBuildMenu] = useState(false);
  const [selectedGround, setSelectedGround] = useState<number>();
  const [indiceTerreno, setIndiceTerreno] = useState<number>(0);
  const [showMessages, setShowMessages] = useState(false); // Estado para controlar la visibilidad de BuildingMensajes

  
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

  const hideBuildMenu = () => {
    setShowBuildMenu(false)
  }

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
  const toggleMessages = () => {
    setShowMessages(!showMessages);
  };
  
  // Ejemplo de usuarios (esto debería venir de tus datos reales)
  const usuariosEjemplo: UsuarioType[] = [
    { id: 1, username: 'Usuario1', email: 'usuario1@example.com', password: 'password1' },
    { id: 2, username: 'Usuario2', email: 'usuario2@example.com', password: 'password2' },
    { id: 3, username: 'Usuario3', email: 'usuario3@example.com', password: 'password3' },
  ];

  
  return (
    <main className="h-screen w-screen flex flex-col bg-cover" style={{ backgroundImage: "url('/images/background.png')" }}>
      <div className="flex justify-between items-start bg-black p-1 ">
        <Resources items={recursos} />
        <div className="flex items-center">
          <button
            onClick={toggleMessages}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Mensajes
          </button>
          <LogoutButton />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end items-center relative">
      {showMessages ? (
          <BuildingMensajes usuario={usuariosEjemplo} />
        ) : (
          <BuildingGrid
            edificios={edificios}
            onEmptyGroundClick={handleEmptyGroundClick}
            onBuildGroundClick={handleBuiltGroundClick}
            partidaJugadorId={partida}
          />
        )}
        <div className="h-24 w-full bg-ground-color p-4">
          {showBuildMenu && (
            <div className="absolute top-0 w-full flex justify-center">
              <div className="w-1/2">
                <BuildingMenu
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
        </div>
      </div>
    </main>
  );
};

export default Map;
