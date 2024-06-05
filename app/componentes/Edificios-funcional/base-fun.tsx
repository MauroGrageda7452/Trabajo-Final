import React, { Dispatch, SetStateAction } from "react";
import { actualizarNivelEdificio } from "@/app/services/edificios-menu";
import { PartidaType } from "@/app/models/partidas";
import edificios, { EdificioType } from "@/app/models/edificios";



const NivelBaseUpgrade = async (
    recursos: PartidaType["recursos"],
    edificio: EdificioType[],
    setRecursos: Dispatch<SetStateAction<PartidaType["recursos"] | null>>,
    onRecursosUpdate: (updatedRecursos: PartidaType["recursos"] | null) => void
  ) => {
    try {
      if (!recursos) {
        console.error("Los recursos son nulos.");
        return;
      }
  
      // Obtener la información de la base
      const base = edificio[0]; // Obtener el primer elemento de la matriz edificios
      if (!base) {
        console.error("No se encontró la base en la lista de edificios.");
        return;
      }
  
      // Obtener los costos de recursos para mejorar la base
      const { agua, comida, chatarra } = edificio[0].costoRecursoscreacion;
  
      // Verificar si el jugador tiene suficientes recursos para mejorar la base
      if (
        recursos.agua_jugador < agua ||
        recursos.comida_jugador < comida ||
        recursos.chatarra_jugador < chatarra
      ) {
        console.error("No tienes suficientes recursos para mejorar la base.");
        return;
      }
  
      // Realizar la mejora de la base
      await actualizarNivelEdificio(edificio[0].nivel, base.nivel + 1);
  
      // Actualizar los recursos del jugador
      const nuevosRecursos = {
        ...recursos,
        agua_jugador: (recursos.agua_jugador || 0) - agua,
        comida_jugador: (recursos.comida_jugador || 0) - comida,
        chatarra_jugador: (recursos.chatarra_jugador || 0) - chatarra
      };
      setRecursos(nuevosRecursos);
      onRecursosUpdate(nuevosRecursos);
    } catch (error) {
      console.error("Error al mejorar la base:", error);
    }
  };

export { NivelBaseUpgrade };