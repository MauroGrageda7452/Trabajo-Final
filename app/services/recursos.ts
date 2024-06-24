'use server'
// import { EdificioType } from "../models/edificios";

import { PartidaType } from "../models/partidas";
import { fetchSave, updateSave } from "./partida-seleccionada"; 

export const getRecursoList = async (recursos: PartidaType['recursos']): Promise<{ agua_jugador: number, comida_jugador: number, chatarra_jugador: number, trabajadores_jugador:number } | null> => {
  try {
    if (!recursos) {
      throw new Error('Recursos no disponibles en la partida.');
    }

    const { agua_jugador, comida_jugador, chatarra_jugador, trabajadores_jugador }  = recursos;
    return { agua_jugador, comida_jugador, chatarra_jugador,trabajadores_jugador };
  } catch (error) {
    console.error("Error al obtener los recursos del jugador:", error);
    return null;
  }
};


export const actualizarRecursoJugador = async (recurso: { name: string, cantidad: number }, partida: number): Promise<PartidaType | null> => {
  
  const partidaActual = await fetchSave(partida);
  if (!partidaActual) {
    throw new Error('No se encontró la partida del jugador.');
  }

  const recursos = partidaActual.recursos;
  if (!recursos) {
    throw new Error('Recursos no disponibles en la partida.');
  }

  if (partidaActual) {
    let recursoActualizado;
    switch (recurso.name) {
      case 'agua':
        recursoActualizado = recursos.agua_jugador + recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        recursos.agua_jugador = recursoActualizado;
        break;
      case 'comida':
        recursoActualizado = recursos.comida_jugador + recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        recursos.comida_jugador = recursoActualizado;
        break;
      case 'chatarra':
        recursoActualizado = recursos.chatarra_jugador + recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        recursos.chatarra_jugador = recursoActualizado;
        break;
      //case ''
      default:
        throw new Error('Recurso desconocido.');
    }
   
    const updatePartida = await updateSave(partidaActual); // Guarda la partida actualizada en la base de datos
    if (!updatePartida){
      throw new Error("Error al actualizar la partida.")
    }
   
    return updatePartida;
    
  } else {
    throw new Error('No se encontró la partida del jugador.');
  }
};

export const actualizarRecursoJugadorRestar = async (recurso: { name: string, cantidad: number }, partida: number): Promise<PartidaType | null> => {
  
  const partidaActual = await fetchSave(partida);
  if (!partidaActual) {
    throw new Error('No se encontró la partida del jugador.');
  }

  const recursos = partidaActual.recursos;
  if (!recursos) {
    throw new Error('Recursos no disponibles en la partida.');
  }

  if (partidaActual) {
    let recursoActualizado;
    switch (recurso.name) {
      case 'agua':
        recursoActualizado = recursos.agua_jugador - recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        recursos.agua_jugador = recursoActualizado;
        break;
      case 'comida':
        recursoActualizado = recursos.comida_jugador - recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        recursos.comida_jugador = recursoActualizado;
        break;
      case 'chatarra':
        recursoActualizado = recursos.chatarra_jugador - recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        recursos.chatarra_jugador = recursoActualizado;
        break;
      //case ''
      default:
        throw new Error('Recurso desconocido.');
    }
   
    const updatePartida = await updateSave(partidaActual); // Guarda la partida actualizada en la base de datos
    if (!updatePartida){
      throw new Error("Error al actualizar la partida.")
    }
   
    return updatePartida;
    
  } else {
    throw new Error('No se encontró la partida del jugador.');
  }
};


//recursos.ts y edificios.ts