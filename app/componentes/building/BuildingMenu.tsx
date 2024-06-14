import React, { useState, useEffect } from "react";
//import { Edificios_menu } from "../../services/edificios-menu";
import { actualizarRecursoJugador, getRecursoList } from "../../services/recursos";
//import { connectDB } from "@/app/libs/gamedb";
import Edificios, { EdificioType } from "../../models/edificios";
//import { PartidaType } from "@/app/models/partidas";
import Button from "../ui/Button";
import { fetchSave, updateSave } from "@/app/services/partida-seleccionada";
import BuildingGrid from "./BuildingGrid";
import { PartidaType } from "@/app/models/partidas";
import { getEdificioList } from "@/app/services/edificios-menu";
// import BuildingEdif from './BuildingEdif';

interface Props {
  //onItemClick: (index: number) => void;
  //playerId: number; //para identificar al jugador
  edificios: EdificioType[];
  onRecursosUpdate: (updatedRecursos: { agua_jugador: number; comida_jugador: number; chatarra_jugador: number; trabajadores_jugador:number; }) => void;
  indiceTerreno : number;
  hideMenu: () => void;
  partidaRecursos: PartidaType['recursos'];
  partidaJugadorId: number;
  buildingImages: string[] | null; // Agregar prop para las imágenes de los edificios
  //terrenoBool : Record<string, boolean>;
  // onBuildingUpdate : (buildingImages : string[]) => void;

}

const BuildingMenu: React.FC<Props> = ({ edificios, 
  /*playerId,*/ onRecursosUpdate,
   indiceTerreno,
    hideMenu,
     partidaRecursos,
      partidaJugadorId, 
      buildingImages,
      }) => {
  const [edificiosList, setEdificiosList] = useState<EdificioType[]>([]);
  const [recursos, setRecursos] = useState<{ agua_jugador: number, comida_jugador: number, chatarra_jugador: number,trabajadores_jugador:number } | null>(null);
  const [showConstruir, setShowConstruir] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

  useEffect(() => {
    const fetchBuildings = async () => {
      const edificios = await getEdificioList(false);
      if (edificios)
      setEdificiosList(edificios);
    };
    

    setRecursos(partidaRecursos);
    fetchBuildings();
  }, [partidaJugadorId]);
  
  const handleItemClick = async (index: number) => {
    setSelectedItemIndex(index);
    setShowConstruir(true);
    //setShowBuildingEdif(true);
  }


const handleConstruirClick = async () => {
  const edificioSeleccionado = edificiosList[selectedItemIndex];
  if (buildingImages) {
    buildingImages[indiceTerreno] = edificioSeleccionado.niveles[1].imagen;
  }
  const { agua, comida, chatarra } = edificioSeleccionado.niveles[1].costoRecursoscreacion;

  const recursosActuales = recursos;
  if (!recursosActuales) {
    console.error("Recursos no cargados");
    return;
  }
  const { agua_jugador, comida_jugador, chatarra_jugador} = recursosActuales;
  
  try {
    // Verificar si hay suficientes recursos para construir el edificio
    if (agua_jugador < agua || comida_jugador < comida || chatarra_jugador < chatarra) {
      console.error("No hay recursos suficiente para construir el edificio.");
      return;
    }

    const partidaActual = await fetchSave(partidaJugadorId);
    if (!partidaActual) {
        throw new Error('No se encontró la partida del jugador.');
    }
    let i = 0
    for (const key in partidaActual.terreno){
      if (partidaActual.terreno[key].edificio_id === -1 && partidaActual.recursos){
          partidaActual.terreno[key].edificio_id = edificioSeleccionado.id; // Reemplaza -1 con el ID del edificio seleccionado
          partidaActual.terreno[key].edificio_nivel = 1;
          partidaActual.terreno[key].edficio_trabajadores =+ 1;
          partidaActual.recursos.trabajadores_jugador -=1;
          partidaActual.recursos.agua_jugador -= agua;
          partidaActual.recursos.chatarra_jugador -= chatarra;
          partidaActual.recursos.comida_jugador -= comida;

        break;
      }
      i++
    }
    // console.log(partidaActual)
    // partidaActual.recursos?.agua_jugador


    await updateSave(partidaActual);

    // Actualizar los recursos después de la construcción del edificio
    // await Promise.all([
    //   actualizarRecursoJugador({ name: "agua", cantidad:  agua }, partidaJugadorId),
    //   actualizarRecursoJugador({ name: "comida", cantidad: comida }, partidaJugadorId),
    //   actualizarRecursoJugador({ name: "chatarra", cantidad: chatarra }, partidaJugadorId)    
    // ]);
    //console.log(agua_jugador)
    const trabajadores = partidaActual.recursos?.trabajadores_jugador;
    if (trabajadores){
      const recursosActualizados = {
        agua_jugador : agua_jugador - agua,
        comida_jugador : comida_jugador - comida,
        chatarra_jugador : chatarra_jugador - chatarra,
        trabajadores_jugador : trabajadores,
     };
    
      setRecursos(recursosActualizados);
      onRecursosUpdate(recursosActualizados);
    }
    hideMenu();
    // Recargar los recursos después de la actualización
    //await cargarRecursos();
    setShowConstruir(false);
    //setShowBuildMenu(false);
  } catch (error) {
    console.error("Error al crear el edificio:", error);
  }
};


  
  return (
    <div className="p-5">
      {edificiosList.map((edificiosList, index) => (
        <div
          key={edificiosList.id}
          className={`item-text bg-black cursor-pointer hover:bg-opacity-50 
          ${ selectedItemIndex === index ? 'bg-blue-500' : 'bg-black'}
          `}
          onClick={() => handleItemClick(index)} // Aquí llamamos a la función handleItemClick en lugar de onItemClick directamente
        >
           {`${edificiosList.name} : ${edificiosList.descripcion}`}

        </div>
      ))}
      {showConstruir && (
        <div className="flex flex-row justify-end items-end mt-2">
          <Button onClick={() => handleConstruirClick()} text={"Construir"} className="bg-green-600 mr-1" />
          <Button onClick={() => hideMenu()} text={"Cancelar"} className="bg-red-600 mr-2" />
        </div>
      )}   
      </div>
  );
};

export default BuildingMenu;

