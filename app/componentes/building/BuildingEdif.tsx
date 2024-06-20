import React, { useState, useEffect } from "react";
import { EdificioType } from "@/app/models/edificios";
// import { actualizarNivelEdificio } from "@/app/services/edificios-menu";
import { NivelBaseUpgrade } from "../Edificios-funcional/base-fun";
import { calculateTimeForBuilding, calculateAmountForBuilding} from "../Edificios-funcional/generarRecursos";
import Button from "../ui/Button";
import partidas, { EdificioTerrenoType, PartidaType, TerrenoType } from "@/app/models/partidas";
import { fetchSave, updateSave } from "@/app/services/partida-seleccionada";

interface Props {
  edificios: EdificioType[];
  recursos: PartidaType["recursos"];
  partidaJugadorId:number;
  terreno : TerrenoType | null;
  hideMenu: () => void;
  indiceTerreno : number;
}

const BuildingEdif: React.FC<Props> = ({ edificios, recursos , indiceTerreno, partidaJugadorId, hideMenu, terreno}) => {
  const [selectedBuilding, setSelectedBuilding] = useState<EdificioType | null>();
  const [selectedBuildingAux, setselectedBuildingAux] = useState<EdificioTerrenoType>();
  const [nivel, setNivel] = useState<number>(1);
  //const [recursos, setRecursos] = useState<PartidaType["recursos"] | null>(null);
  //const [trabajadores, setTrabajadores] = useState<number>(0);
  const [newWorkers, setNewWorkers] = useState<number>(0);
  //const [terreno, setTerreno] = useState<TerrenoType>();
  const trabajadoresRequeridosPorNivel = [1, 10, 20];

  const handleItemClick = () => {
    //console.log(index)
    //console.log(indiceTerreno)
    //console.log(terreno);
    if (terreno){
      const key = Object.keys(terreno)[indiceTerreno];
      console.log(key)
      const edificioTerreno = terreno[key];
      //console.log(edificioTerreno)
      if (edificioTerreno){
        setselectedBuildingAux(edificioTerreno);
        const edificioConstruido = edificios?.find(edificio => edificio.id === edificioTerreno.edificio_id);
        if (edificioConstruido)
        setSelectedBuilding(edificioConstruido);
        //console.log(edificioConstruido)
      }

      setNivel(edificioTerreno.edificio_nivel);

      //handleItemClick(index);
      // hideMenu();
      // if (terreno && typeof terreno === 'object') {
      //   Object.keys(terreno).map(key => {
      //     // Aseguramiento de tipo para saveData.terreno[key]
      //   const edificioTerreno = terreno[key] as EdificioTerrenoType;
      //   const buildingId = edificioTerreno.edificio_id;
      //   const edificio = edificios?.find(edificio => edificio.id === buildingId);
      //   if (edificioTerreno)
      //     console.log(edificioTerreno)
      //   });
      // }
    }//setTerreno(partida.terreno['index'])
  };

  const handleMejorarEdificio = async () => {
    const partidaActual = await fetchSave(partidaJugadorId);
    if ( partidaActual && selectedBuilding&& terreno && selectedBuildingAux && selectedBuildingAux.edficio_trabajadores && nivel < 3) {
      const nuevoNivel = nivel + 1;
      if (selectedBuilding.id === 0) {
        console.log("Mejorando la base...");
      } else {
        if (selectedBuildingAux.edficio_trabajadores >= trabajadoresRequeridosPorNivel[nuevoNivel - 1]) {
          setNivel(nuevoNivel);
          //actualizarNivelEdificio(selectedBuildingAux.edificio_id, nuevoNivel);
          
          selectedBuildingAux.edificio_nivel = nuevoNivel;
          setselectedBuildingAux(selectedBuildingAux);
          partidaActual.terreno[Object.keys(partidaActual.terreno)[indiceTerreno]].edificio_nivel = nuevoNivel;
          
          updateSave(partidaActual);
          //Object.keys(terreno)[indiceTerreno]          
          //setSelectedBuilding({ ...selectedBuilding });
        } else {
          alert(`Necesitas ${trabajadoresRequeridosPorNivel[nuevoNivel - 1]} trabajadores para mejorar al nivel ${nuevoNivel}`);
        }
      }
    }
  };

  const handleAddWorkers = async () => {
    console.log(selectedBuildingAux, selectedBuildingAux?.edficio_trabajadores , recursos)
    if (selectedBuildingAux && recursos) {
      const partidaActual = await fetchSave(partidaJugadorId);
      if (partidaActual && partidaActual.recursos) {
        const key = Object.keys(partidaActual.terreno)[indiceTerreno];

        if (selectedBuildingAux.edificio_id === 0) {
          // La base genera trabajadores
          if (recursos.agua_jugador >= newWorkers * 25 && recursos.comida_jugador >= newWorkers * 25 && recursos.chatarra_jugador >= newWorkers * 25) {
            recursos.trabajadores_jugador += newWorkers;
            recursos.agua_jugador -= newWorkers * 25;
            recursos.comida_jugador -= newWorkers * 25;
            recursos.chatarra_jugador -= newWorkers * 25;
            partidaActual.recursos = recursos;
            await updateSave(partidaActual);
          } else {
            console.error("Recursos insuficientes para generar nuevos trabajadores");
          }
        } else {
          // Para otros edificios
          if (recursos.trabajadores_jugador >= newWorkers && selectedBuildingAux.edficio_trabajadores) {
            recursos.trabajadores_jugador -= newWorkers;
            selectedBuildingAux.edficio_trabajadores += newWorkers;
            partidaActual.terreno[key].edficio_trabajadores = selectedBuildingAux.edficio_trabajadores;
            partidaActual.recursos = recursos;
            setselectedBuildingAux({ ...selectedBuildingAux });
            await updateSave(partidaActual);
          } else {
            console.error("No hay suficientes trabajadores disponibles");
          }
        }
      }
    } else {
      console.error("Recursos insuficientes o edificio no seleccionado");
    }
  };
  
  // building images. poner más
  const getIntervalTime = (building: EdificioType, nivel: number): number => {
    switch (building.name) {
      case 'Pozo':
        return calculateTimeForBuilding(nivel);
      case 'Criadero':
        return calculateTimeForBuilding(nivel);
      case 'Chatarreria':
        return calculateTimeForBuilding(nivel);
      default:
        return 30000;
    }
  };

  const getResourceAmount = (building: EdificioType, nivel: number): number => {
    switch (building.name) {
      case 'Pozo':
        return calculateAmountForBuilding(nivel);
      case 'Criadero':
        return calculateAmountForBuilding(nivel);
      case 'Chatarreria':
        return calculateAmountForBuilding(nivel);
      default:
        return 0;
    }
  };

  return (
    <div className="p-10 bg-white shadow-lg rounded-lg">
      <div className="flex space-x-4">
        
          <button
            onClick={() => handleItemClick()}
            className="p-4 bg-blue-500 text-white rounded-lg"
          >
            Seleccionar Edificio
          </button>
        
        
        <Button onClick={() => hideMenu()} text={"X"} className="bg-red-600 ml-20 p-1 px-6 rounded" />
      </div> 
      
      {selectedBuilding && (
        <div className="mt-10 p-10 bg-gray-400 shadow-md rounded-lg">
          <h3 className="text-2xl text-black font-bold mb-4 ">{selectedBuilding.name}</h3>
          <p className="text-lg mb-4 text-black">{selectedBuilding.descripcion}</p>
          <p className="text-lg mb-4 text-black">
            Genera {getResourceAmount(selectedBuilding, nivel)}{" "}
            cada{" "}
            {getIntervalTime(selectedBuilding, nivel) / 1000} segundos
          </p>
          <div className="flex justify-between items-center">
            <p className="text-lg text-black">
              Trabajadores requeridos para nivel {nivel + 1}: {trabajadoresRequeridosPorNivel[nivel]}
            </p>
            {nivel < 3 && (
              <Button
                onClick={handleMejorarEdificio}
                text={`Mejorar (Nivel ${nivel + 1})`}
                className="bg-blue-600 text-black ml-5 p-3 rounded-lg hover:bg-blue-700"
              />
            )}
          </div>
          <div className="mt-4">
            <p className="text-lg text-black">
              Trabajadores actuales: {selectedBuildingAux?.edficio_trabajadores}
            </p>
            <div className="flex items-center">
              <button
                onClick={() => setNewWorkers((prev) => Math.max(prev - 1, 0))}
                className="p-2 bg-gray-600 rounded-lg"
              >
                -
              </button>
              <span className="mx-4 text-lg">{newWorkers}</span>
              <button
                onClick={() => setNewWorkers((prev) => prev + 1)}
                className="p-2 bg-gray-600 rounded-lg"
              >
                +
              </button>
              <Button
                onClick={handleAddWorkers}
                text={`Agregar Trabajadores`}
                className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 ml-4"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BuildingEdif;



//const data = fetchSave(partidaJugadorId);
    //if (data){
      //console.log(data);
    //}//const edificioSeleccionado = edificios[index];
    //setSelectedBuilding(edificioSeleccionado);
    //setNivel(edificioSeleccionado.nivel || 1); 
  // funcionalidad handleItemClick