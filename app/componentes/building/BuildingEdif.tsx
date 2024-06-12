// import React, { useState, useEffect } from "react";
// import { EdificioType } from "@/app/models/edificios";
// import { actualizarNivelEdificio, actualizarTrabajadoresEdificio } from "@/app/services/edificios-menu";
// import { actualizarRecursoJugador } from "@/app/services/recursos";
// import { NivelBaseUpgrade } from "../Edificios-funcional/base-fun";
// import { calculateTimeForBuildingPozo, calculateAmountForBuildingPozo } from "../Edificios-funcional/pozo-fun"
// import { calculateTimeForBuildingCriadero, calculateAmountForBuildingCriadero } from "../Edificios-funcional/criadero-fun";
// import { calculateTimeForBuildingChatarreria, calculateAmountForBuildingChatarreria } from "../Edificios-funcional/chatarreria-fun";
// import Button from "../ui/Button";
// import partidas, { PartidaType } from "@/app/models/partidas";

// interface Props {
//   edificios: EdificioType[];
//   recursos: PartidaType["recursos"];
//   partidaJugadorId:number;
//   hideMenu: () => void;
// }

// const BuildingEdif: React.FC<Props> = ({ edificios, recursos , partidaJugadorId, hideMenu}) => {
//   const [selectedBuilding, setSelectedBuilding] = useState<EdificioType | null>(null);
//   const [nivel, setNivel] = useState<number>(1);
//   //const [recursos, setRecursos] = useState<PartidaType["recursos"] | null>(null);
//   const [trabajadores, setTrabajadores] = useState<number>(0);
//   const [newWorkers, setNewWorkers] = useState<number>(0);

//   const trabajadoresRequeridosPorNivel = [1, 10, 20];

//   const handleItemClick = (index: number) => {
//     const edificioSeleccionado = edificios[index];
//     setSelectedBuilding(edificioSeleccionado);
//     setNivel(edificioSeleccionado.nivel || 1);
//   };

//   const handleMejorarEdificio = () => {
//     if (selectedBuilding && nivel < 3) {
//       const nuevoNivel = nivel + 1;
//       if (selectedBuilding.id === 0) {
//         console.log("Mejorando la base...");
//       } else {
//         if (selectedBuilding.trabajadores >= trabajadoresRequeridosPorNivel[nuevoNivel - 1]) {
//           setNivel(nuevoNivel);
//           actualizarNivelEdificio(selectedBuilding.id, nuevoNivel);
//           selectedBuilding.nivel = nuevoNivel;
//           setSelectedBuilding({ ...selectedBuilding });
//         } else {
//           alert(`Necesitas ${trabajadoresRequeridosPorNivel[nuevoNivel - 1]} trabajadores para mejorar al nivel ${nuevoNivel}`);
//         }
//       }
//     }
//   };

//   const handleAddWorkers = async () => {
//     if (selectedBuilding && recursos && recursos.trabajadores_jugador > 0) {
//       // Calcula la cantidad de nuevos trabajadores del edificio
//       const nuevosTrabajadoresEdificio = selectedBuilding.trabajadores + newWorkers;
  
//       if (newWorkers <= recursos.trabajadores_jugador) {
//         const nuevosTrabajadoresJugador = recursos.trabajadores_jugador - newWorkers;
//         const successEdificio = await actualizarTrabajadoresEdificio(selectedBuilding.id, nuevosTrabajadoresEdificio);
//         if (successEdificio) {
//           const successRecursos = await actualizarRecursoJugador({ name: 'trabajadores', cantidad: newWorkers },partidaJugadorId);
//           if (successRecursos) {
//             setTrabajadores(nuevosTrabajadoresEdificio);
//             selectedBuilding.trabajadores = nuevosTrabajadoresEdificio;
//             setSelectedBuilding({ ...selectedBuilding });
//           } else {
//             console.error("Error al actualizar los recursos del jugador");
//           }
//         } else {
//           console.error("Error al actualizar el edificio");
//         }
//       } else {
//         console.error("No hay suficientes trabajadores disponibles");
//       }
//     } else {
//       console.error("Recursos insuficientes o edificio no seleccionado");
//     }
//   };
  

//   const getIntervalTime = (building: EdificioType, nivel: number): number => {
//     switch (building.name) {
//       case 'Pozo':
//         return calculateTimeForBuildingPozo(nivel);
//       case 'Criadero':
//         return calculateTimeForBuildingCriadero(nivel);
//       case 'Chatarreria':
//         return calculateTimeForBuildingChatarreria(nivel);
//       default:
//         return 30000;
//     }
//   };

//   const getResourceAmount = (building: EdificioType, nivel: number): number => {
//     switch (building.name) {
//       case 'Pozo':
//         return calculateAmountForBuildingPozo(nivel);
//       case 'Criadero':
//         return calculateAmountForBuildingCriadero(nivel);
//       case 'Chatarreria':
//         return calculateAmountForBuildingChatarreria(nivel);
//       default:
//         return 0;
//     }
//   };

//   useEffect(() => {
//     if (selectedBuilding) {
//       const intervalo = getIntervalTime(selectedBuilding, nivel);
//       const cantidadRecursoConseguido = getResourceAmount(selectedBuilding, nivel);

//       const intervaloGeneracion = setInterval(() => {
//         console.log(`Generando ${cantidadRecursoConseguido} cada ${intervalo / 1000} segundos`);
//       }, intervalo);

//       return () => clearInterval(intervaloGeneracion);
//     }
//   }, [selectedBuilding, nivel]);

//   return (
//     <div className="p-10 bg-white shadow-lg rounded-lg">
//       <div className="flex space-x-4">
//         {edificios.map((edificio, index) => (
//           <button
//             key={edificio.id}
//             onClick={() => handleItemClick(index)}
//             className="p-4 bg-blue-500 text-white rounded-lg"
//           >
//             {edificio.name}
//           </button>
//         ))}
//         <Button onClick={() => hideMenu()} text={"X"} className="bg-red-600 ml-20 p-1 px-6 rounded" />
//       </div>
      
//       {selectedBuilding && (
//         <div className="mt-10 p-10 bg-gray-400 shadow-md rounded-lg">
//           <h3 className="text-2xl text-black font-bold mb-4 ">{selectedBuilding.name}</h3>
//           <p className="text-lg mb-4 text-black">{selectedBuilding.descripcion}</p>
//           <p className="text-lg mb-4 text-black">
//             Genera {getResourceAmount(selectedBuilding, nivel)}{" "}
//             cada{" "}
//             {getIntervalTime(selectedBuilding, nivel) / 1000} segundos
//           </p>
//           <div className="flex justify-between items-center">
//             <p className="text-lg text-black">
//               Trabajadores requeridos para nivel {nivel + 1}: {trabajadoresRequeridosPorNivel[nivel]}
//             </p>
//             {nivel < 3 && (
//               <Button
//                 onClick={handleMejorarEdificio}
//                 text={`Mejorar (Nivel ${nivel + 1})`}
//                 className="bg-blue-600 text-black ml-5 p-3 rounded-lg hover:bg-blue-700"
//               />
//             )}
//           </div>
//           <div className="mt-4">
//             <p className="text-lg text-black">
//               Trabajadores actuales: {selectedBuilding.trabajadores}
//             </p>
//             <div className="flex items-center">
//               <button
//                 onClick={() => setNewWorkers((prev) => Math.max(prev - 1, 0))}
//                 className="p-2 bg-gray-600 rounded-lg"
//               >
//                 -
//               </button>
//               <span className="mx-4 text-lg">{newWorkers}</span>
//               <button
//                 onClick={() => setNewWorkers((prev) => prev + 1)}
//                 className="p-2 bg-gray-600 rounded-lg"
//               >
//                 +
//               </button>
//               <Button
//                 onClick={handleAddWorkers}
//                 text={`Agregar Trabajadores`}
//                 className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 ml-4"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default BuildingEdif;