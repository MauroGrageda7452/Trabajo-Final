'use server'
import Edificios, {EdificioType} from "../models/edificios";
import { PartidaType } from "../models/partidas";
import {fetchSaveEdificios, fetchSave, updateSave } from "./partida-seleccionada"; 
 


// Función para obtener la lista de edificios
export const getEdificioList = async (): Promise<EdificioType[] | null> => {
  try {
    
    const edificios_menu = await fetchSaveEdificios();
    if(edificios_menu){
    }
    //edificios_menu?.shift();
    return edificios_menu;
  } catch (error) {
    console.error('Error al obtener la lista de edificios:', error);
    return null;
  }
};
