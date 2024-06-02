'use server'
//import { StaticImageData } from "next/image"
//import pozoimg from "/public/placeholders/pozo_ph.png"
//import criaimg from "/public/placeholders/criadero_ph.png"
//import chataimg from "/public/placeholders/chatarra_ph.png"
//import { Recurso, actualizarRecurso, findRecursoByName } from "./recursos"

// export type Edificios_menu = {
//   id: number
//   name: string
//   descripcion: string
//   imagen: StaticImageData
//   //costoRecursos: Recurso[]
// }
// const edificiosList: Edificios_menu[] = [
//   { id: 1, name: 'Pozo', descripcion: "Recoleccion de agua", imagen: pozoimg/* costoRecursos: [{id: 1, name: 'Agua', cantidad: 50 }, {id: 2, name: 'Comida', cantidad: 150 }, {id: 3, name: 'Chatarra', cantidad: 100 }]*/},
//   { id: 2, name: 'Criadero', descripcion: "Matanza de ovejas radiactivas", imagen: criaimg/* costoRecursos: [{id: 1, name: 'Agua', cantidad: 100 }, {id: 2, name: 'Comida', cantidad: 50 }, {id: 3, name: 'Chatarra', cantidad: 200 }] */},
//   { id: 3, name: 'Chatarreria', descripcion: "Recoleccion de chatarra", imagen: chataimg/* costoRecursos: [{id: 1, name: 'Agua', cantidad: 200 }, {id: 2, name: 'Comida', cantidad: 100 }, {id: 3, name: 'Chatarra', cantidad: 50 }]*/ },
// ]

// export const findEdificiosById = async (id: number) => {
//   return edificiosList.find(p => p.id === id)
// }

// export const findEdificiosByName = async (name: string) => {
//   return edificiosList.find(p => p.name === name)
// }

// export const getEdificiosList = async (): Promise<Edificios_menu[]> => {
//   // const data = await algoQueLlamaALaBd()
//     return edificiosList; // Devolver la lista
//   };

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
