import React, { useState, useEffect } from "react";
import { EdificioType } from "@/app/models/edificios";
//import { NivelBaseUpgrade } from "../Edificios-funcional/base-fun";
import { calculateTimeForBuilding, calculateAmountForBuilding} from "../Edificios-funcional/generarRecursos";
import Button from "../ui/Button";
import partidas, { EdificioTerrenoType, PartidaType, TerrenoType } from "@/app/models/partidas";
import { fetchSave, updateSave } from "@/app/services/partida-seleccionada";
import ConsoleContainer from "../ui/ConsoleContainer";


interface Props {
  edificios: EdificioType[];
  recursos: PartidaType["recursos"];
  partidaJugadorId:number;
  terreno : TerrenoType | null;
  hideMenu: () => void;
  indiceTerreno : number;
  buildingImages: string[] | null;
  onTerrenoUpdate : (updateTerreno : PartidaType['terreno']) => void;
}

const BuildingEdif: React.FC<Props> = ({ edificios, recursos, indiceTerreno, partidaJugadorId, hideMenu, terreno, buildingImages, onTerrenoUpdate}) => {
  const [selectedBuilding, setSelectedBuilding] = useState<EdificioType | null>();
  const [selectedBuildingAux, setSelectedBuildingAux] = useState<EdificioTerrenoType | null>(null);
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
        setSelectedBuildingAux(edificioTerreno);
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
        setSelectedBuildingAux(selectedBuildingAux);
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
          buildingImages[indiceTerreno] = selectedBuilding.niveles[nuevoNivel].imagen;
          buildingImages.push('');
        }
        onTerrenoUpdate(partidaActual.terreno);
        await updateSave(partidaActual);
      } else {
        if (recursos &&  selectedBuildingAux.edficio_trabajadores && selectedBuildingAux.edficio_trabajadores >= trabajadoresRequeridosPorNivel[nuevoNivel - 1]) {
          setNivel(nuevoNivel);
          selectedBuildingAux.edificio_nivel = nuevoNivel;
          setSelectedBuildingAux(selectedBuildingAux);
          recursos.chatarra_jugador -= selectedBuilding.niveles[nuevoNivel].costoRecursoscreacion.chatarra;
          recursos.comida_jugador -= selectedBuilding.niveles[nuevoNivel].costoRecursoscreacion.comida;
          recursos.agua_jugador -= selectedBuilding.niveles[nuevoNivel].costoRecursoscreacion.agua;
          partidaActual.recursos = recursos;
          partidaActual.terreno[Object.keys(partidaActual.terreno)[indiceTerreno]].edificio_nivel = nuevoNivel;
          updateSave(partidaActual);
          if (buildingImages){
            buildingImages[indiceTerreno] = selectedBuilding.niveles[nuevoNivel].imagen;
          }
          
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
            setSelectedBuildingAux({ ...selectedBuildingAux });
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
    <div className="p-8 shadow-lg">
      <div className="flex float-end">
        
          {/* <button
            onClick={() => handleItemClick()}
            className="p-4 bg-blue-500 text-white rounded-lg"
          >
            Seleccionar Edificio
          </button> */}
        
        
        <Button onClick={() => hideMenu()} text={"X"} className="ml-20 p-1 px-6 rounded font-black text-gray-900" />
      </div> 
      
      {selectedBuilding && (
        <ConsoleContainer className="mt-10 p-12 px-16 text-green-500">
          <h3 className="text-2xl font-bold mb-2 ">{selectedBuilding.name}</h3>
          <p className="text-lg">{selectedBuilding.descripcion}</p>
          {selectedBuilding.id !== 0 &&(
            <>
              <p className="text-lg mb-2">
                Genera {getResourceAmount(selectedBuilding, nivel)} cada {getIntervalTime(selectedBuilding, nivel) / 1000} segundos
              </p>
              
              {nivel < 3 && (
                <>
                <div className="flex justify-between items-center">
                <div className="flex-col-1 text-lg">
                <p className="">Costos mejora:</p>
                  <p className="text-base">
                      Trabajadores requeridos para nivel {nivel + 1}: {trabajadoresRequeridosPorNivel[nivel]}
                      <br />
                      Agua Costo: {selectedBuilding.niveles[nivel + 1]?.costoRecursoscreacion?.agua}
                      <br />
                      Comida Costo: {selectedBuilding.niveles[nivel + 1]?.costoRecursoscreacion?.comida}
                      <br />
                      Chatarra Costo: {selectedBuilding.niveles[nivel + 1]?.costoRecursoscreacion?.chatarra}
                  </p>
                </div>
                </div>
                <button
                  onClick={handleMejorarEdificio}
                  className="text-black bg-green-500 p-2 rounded-lg hover:bg-green-300"
                >
                  Mejorar (Nivel {nivel + 1})
                </button>
                </>
              )}
              <div className="mt-4">
                <p className="text-lg">
                  Trabajadores actuales: {selectedBuildingAux?.edficio_trabajadores}
                </p>
                <div className="flex items-center">
                  <button
                    onClick={() => setNewWorkers((prev) => Math.max(prev - 1, 0))}
                    className="p-2 bg-green-500 rounded-lg text-black hover:bg-green-300"
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg">{newWorkers}</span>
                  <button
                    onClick={() => setNewWorkers((prev) => prev + 1)}
                    className="p-2 bg-green-500 rounded-lg text-black hover:bg-green-300"
                  >
                    +
                  </button>
                  <button
                    onClick={handleAddWorkers}
                    className="text-black bg-green-500 p-2 rounded-lg hover:bg-green-300 ml-3"
                  > Agregar Trabajadores
                  </button>
                </div>
              </div>
              
            </>
         )
        }
        { selectedBuilding.id === 0 && (
          <>
            
            <div className=" text-green-500">
            {nivel < 3 && (
                <>
                <div className="flex justify-between items-center mt-2">
                <div className="flex-col-1 text-lg">
                <p className="">Costos mejora:</p>
                  <p className="text-base">
                      Agua Costo: {selectedBuilding.niveles[nivel + 1]?.costoRecursoscreacion?.agua}
                      <br />
                      Comida Costo: {selectedBuilding.niveles[nivel + 1]?.costoRecursoscreacion?.comida}
                      <br />
                      Chatarra Costo: {selectedBuilding.niveles[nivel + 1]?.costoRecursoscreacion?.chatarra}
                  </p>
                </div>
                </div>
                <button
                  onClick={handleMejorarEdificio}
                  className="text-black bg-green-500 p-2 rounded-lg hover:bg-green-300 mb-4"
                >
                  Mejorar (Nivel {nivel + 1})
                </button>
                </>
              )}
                <div className="flex items-center">
                  <button
                    onClick={() => setNewWorkers((prev) => Math.max(prev - 1, 0))}
                    className="p-2 bg-green-500 rounded-lg text-black hover:bg-green-300"
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg">{newWorkers}</span>
                  <button
                    onClick={() => setNewWorkers((prev) => prev + 1)}
                    className="p-2 bg-green-500 rounded-lg text-black hover:bg-green-300"
                  >
                    +
                  </button>
                  <button
                    onClick={handleAddWorkers}
                    className="text-black bg-green-500 p-2 rounded-lg hover:bg-green-300 ml-3"
                  > Comprar Trabajadores
                  </button>
                </div>
              </div>

          </>
          
        )
        }   
        </ConsoleContainer>
      )}
    </div>
  );
};
export default BuildingEdif;
