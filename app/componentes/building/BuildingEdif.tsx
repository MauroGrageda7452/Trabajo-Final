import React, { useState, useEffect } from "react";
import { EdificioType } from "@/app/models/edificios";
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
  buildingImages: string[] | null;
}

const BuildingEdif: React.FC<Props> = ({ edificios, recursos , indiceTerreno, partidaJugadorId, hideMenu, terreno, buildingImages}) => {
  const [selectedBuilding, setSelectedBuilding] = useState<EdificioType | null>();
  const [selectedBuildingAux, setselectedBuildingAux] = useState<EdificioTerrenoType>();
  const [nivel, setNivel] = useState<number>(1);
  const [newWorkers, setNewWorkers] = useState<number>(0);
  const trabajadoresRequeridosPorNivel = [1, 10, 20];

  useEffect(() => {
    handleItemClick();
  }, [buildingImages]);

  const handleItemClick = () => {
    if (terreno){
      const key = Object.keys(terreno)[indiceTerreno];
      const edificioTerreno = terreno[key];
      if (edificioTerreno){
        setselectedBuildingAux(edificioTerreno);
        const edificioConstruido = edificios?.find(edificio => edificio.id === edificioTerreno.edificio_id);
        if (edificioConstruido){
        setSelectedBuilding(edificioConstruido);
        }
        setNivel(edificioTerreno.edificio_nivel);
      }
    }
  };



  const handleMejorarEdificio = async () => {
    const partidaActual = await fetchSave(partidaJugadorId);
    if ( partidaActual && selectedBuilding && selectedBuildingAux && nivel < 3) {
      const nuevoNivel = nivel + 1;
      if (selectedBuildingAux.edificio_id === 0 && recursos) {
        setNivel(nuevoNivel);
        selectedBuildingAux.edificio_nivel = nuevoNivel;
        setselectedBuildingAux(selectedBuildingAux);
        recursos.chatarra_jugador -= selectedBuilding.niveles[nuevoNivel].costoRecursoscreacion.chatarra;
        recursos.comida_jugador -= selectedBuilding.niveles[nuevoNivel].costoRecursoscreacion.comida;
        recursos.agua_jugador -= selectedBuilding.niveles[nuevoNivel].costoRecursoscreacion.agua;
        partidaActual.recursos = recursos;
        partidaActual.terreno[Object.keys(partidaActual.terreno)[indiceTerreno]].edificio_nivel = nuevoNivel;
        const nuevoTerrenoKey = `pos${Object.keys(partidaActual.terreno).length}`; 
        partidaActual.terreno[nuevoTerrenoKey] = {
          edificio_id: -1,
          edificio_nivel: 0,
          edficio_trabajadores: 0,
        };
        if (buildingImages) {
          buildingImages.push('');
        }
        await updateSave(partidaActual);
      } else {
        if (recursos &&  selectedBuildingAux.edficio_trabajadores && selectedBuildingAux.edficio_trabajadores >= trabajadoresRequeridosPorNivel[nuevoNivel - 1]) {
          setNivel(nuevoNivel);
          selectedBuildingAux.edificio_nivel = nuevoNivel;
          setselectedBuildingAux(selectedBuildingAux);
          recursos.chatarra_jugador -= selectedBuilding.niveles[nuevoNivel].costoRecursoscreacion.chatarra;
          recursos.comida_jugador -= selectedBuilding.niveles[nuevoNivel].costoRecursoscreacion.comida;
          recursos.agua_jugador -= selectedBuilding.niveles[nuevoNivel].costoRecursoscreacion.agua;
          partidaActual.recursos = recursos;
          partidaActual.terreno[Object.keys(partidaActual.terreno)[indiceTerreno]].edificio_nivel = nuevoNivel;
          updateSave(partidaActual);
          
        } else {
          alert(`Necesitas ${trabajadoresRequeridosPorNivel[nuevoNivel - 1]} trabajadores para mejorar al nivel ${nuevoNivel}`);
        }
      }
    }else{
      alert("error desconocido");
    }
  };

  const handleAddWorkers = async () => {
    if (selectedBuildingAux && recursos) {
      const partidaActual = await fetchSave(partidaJugadorId);
      if (partidaActual && partidaActual.recursos) {
        const key = Object.keys(partidaActual.terreno)[indiceTerreno];

        if (selectedBuildingAux.edificio_id === 0) {
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
      case 'Chatarrería':
        return calculateAmountForBuilding(nivel);
      default:
        return 0;
    }
  };

  return (
    <div className="p-10 bg-white shadow-lg rounded-lg">
      <div className="flex space-x-4">
        
          {/* <button
            onClick={() => handleItemClick()}
            className="p-4 bg-blue-500 text-white rounded-lg"
          >
            Seleccionar Edificio
          </button> */}
        
        
        <Button onClick={() => hideMenu()} text={"X"} className="bg-red-600 ml-20 p-1 px-6 rounded" />
      </div> 
      
      {selectedBuilding && (
        <div className="mt-10 p-10 bg-gray-400 shadow-md rounded-lg">
          <h3 className="text-2xl text-black font-bold mb-4 ">{selectedBuilding.name}</h3>
          <p className="text-lg mb-4 text-black">{selectedBuilding.descripcion}</p>
          {selectedBuilding.id !== 0 &&(
            <>
              <p className="text-lg mb-4 text-black">
                Genera {getResourceAmount(selectedBuilding, nivel)} cada {getIntervalTime(selectedBuilding, nivel) / 1000} segundos
              </p>
              
              {nivel < 3 && (
                <>
                  <div className="flex justify-between items-center">

                <p className="text-lg text-black">
                  Trabajadores requeridos para nivel {nivel + 1}: {trabajadoresRequeridosPorNivel[nivel]}
                </p>
                <Button
                  onClick={handleMejorarEdificio}
                  text={`Mejorar (Nivel ${nivel + 1})`}
                  className="bg-blue-600 text-black ml-5 p-3 rounded-lg hover:bg-blue-700"
                />
                </div>
                <div className="flex-col-1">
                  <p className="text-lg text-black">
                      Agua Costo: {selectedBuilding.niveles[nivel + 1]?.costoRecursoscreacion?.agua}
                      <br />
                      Comida Costo: {selectedBuilding.niveles[nivel + 1]?.costoRecursoscreacion?.comida}
                      <br />
                      Chatarra Costo: {selectedBuilding.niveles[nivel + 1]?.costoRecursoscreacion?.chatarra}
                  </p>
                </div>
                </>
              )}
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
              
            </>
         )
        }
        { selectedBuilding.id === 0 && (
          <>
            
            <div className="mt-4">
              <div className="flex">

                <div className="flex-col-1">
                  <p className="text-lg text-black">
                      Agua Costo: {selectedBuilding.niveles[nivel + 1]?.costoRecursoscreacion?.agua}
                      <br />
                      Comida Costo: {selectedBuilding.niveles[nivel + 1]?.costoRecursoscreacion?.comida}
                      <br />
                      Chatarra Costo: {selectedBuilding.niveles[nivel + 1]?.costoRecursoscreacion?.chatarra}
                  </p>
                </div>
                <div className="flex-col-2 mt-4">
                  {nivel < 3 && (
                    <Button
                      onClick={handleMejorarEdificio}
                      text={`Mejorar (Nivel ${nivel + 1})`}
                      className="bg-blue-600 text-black ml-5 p-3 rounded-lg hover:bg-blue-700 flex-col-2"
                    />
                  )}
                </div>
              </div>

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
                    text={`Comprar Trabajadores`}
                    className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 ml-4"
                  />
                </div>
              </div>

          </>
          
        )
        }   
        </div>
      )}
    </div>
  );
};
export default BuildingEdif;
