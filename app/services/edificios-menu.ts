'use server'
import {EdificioType} from "../models/edificios";
// import { PartidaType } from "../models/partidas";
import {fetchSaveEdificios} from "./partida-seleccionada"; 
import { actualizarEdificio } from "./partida-seleccionada";


// Función para obtener la lista de edificios
export const getEdificioList = async (base:boolean ): Promise<EdificioType[] | null> => {
  try {
    
    const edificios_menu = await fetchSaveEdificios(base);
    
    //edificios_menu?.shift();
    return edificios_menu;
  } catch (error) {
    console.error('Error al obtener la lista de edificios:', error);
    return null;
  }
};



// Esta función actualiza el nivel de un edificio en la base de datos
// export const actualizarNivelEdificio = async (edificioId: number, nuevoNivel: number): Promise<boolean> => {
//   try {
//     // Actualizar el nivel del edificio en la base de datos utilizando la función de partida-seleccionada
//     await actualizarEdificio(edificioId, { nivel: nuevoNivel });
//     return true; // Indicar que la actualización fue exitosa
//   } catch (error) {
//     console.error("Error al actualizar el nivel del edificio:", error);
//     return false; // Indicar que l  a actualización falló
//   }
// };

// export const actualizarTrabajadoresEdificio = async (edificioId: number, nuevosTrabajadores: number): Promise<boolean> => {
//   try {
//     await actualizarEdificio(edificioId, { trabajadores: nuevosTrabajadores });
//     return true;
//   } catch (error) {
//     console.error("Error al actualizar los trabajadores del edificio:", error);
//     return false;
//   }
// };