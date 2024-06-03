import { useRecursos } from './recursosConQuery';
import { useBuildingImages } from './edficiosConQuery';
import { useEdificios } from './edficiosConQuery';
import { fetchSave, updateSave } from '../services/partida-seleccionada';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { generarRecursosAgua , calculateTimeForBuildingPozo} from '../componentes/Edificios-funcional/pozo-fun';
import { generarRecursosCriadero, calculateTimeForBuildingCriadero } from '../componentes/Edificios-funcional/criadero-fun';
import { calculateTimeForBuildingChatarra, generarRecursosChatarra } from '../componentes/Edificios-funcional/chatarreria-fun';



export const useConstruccion = () => {
  const { recursosData, handleRecursosUpdate } = useRecursos();
  const { buildingImages, actualizarBuildingMutation } = useBuildingImages();
  const { edificiosData } = useEdificios();
  const queryClient = useQueryClient();
  const intervalRefs = useRef<(NodeJS.Timeout | number)[]>([]);



  const handleConstruccion = async (index: number, onItemClick: () => void ) => {
    if (!edificiosData || !recursosData) return;

    const edificioSeleccionado = edificiosData[index];
    const { agua, comida, chatarra } = edificioSeleccionado.costoRecursoscreacion;
    const { agua_jugador, comida_jugador, chatarra_jugador } = recursosData;

    try {
      const partidaActual = await fetchSave(1002);
      if (!partidaActual) throw new Error('No se encontró la partida del jugador.');

      let espacioDisponible = null;

      for (const key in partidaActual.terreno) {
        if (partidaActual.terreno[key] === -1) {
          espacioDisponible = key;
          break;
        }
      }

      if (espacioDisponible === null) {
        console.error("No hay espacio disponible para construir el edificio.");
        return;
      }

      // Verificar recursos y construir edificio
      if (agua_jugador < agua || comida_jugador < comida || chatarra_jugador < chatarra) {
        console.error("No hay suficientes recursos para construir el edificio.");
        return;
      }
      await onItemClick();

      // Actualizar el terreno con el nuevo edificio
      partidaActual.terreno[espacioDisponible] = edificioSeleccionado.id;
      await updateSave(partidaActual);
      // Actualizar los recursos del jugador
      const recursosActualizados = {
        agua_jugador: agua_jugador - agua,
        comida_jugador: comida_jugador - comida,
        chatarra_jugador: chatarra_jugador - chatarra,
      };
      await handleRecursosUpdate(
        recursosActualizados.agua_jugador,
        recursosActualizados.comida_jugador,
        recursosActualizados.chatarra_jugador
      );

      // Actualizar las imágenes de los edificios
      await actualizarBuildingMutation.mutateAsync({
        src: edificioSeleccionado.imagen,
        index: parseInt(espacioDisponible, 10)
      });

      //queryClient.invalidateQueries({ queryKey: ['recursos'] });
      queryClient.invalidateQueries({ queryKey: ['buildingImages'] });
      //queryClient.invalidateQueries({ queryKey: ['partida'] });

      if (edificioSeleccionado.id === 1) {
        const intervalId = setInterval(async () => {
          await generarRecursosAgua(1002, 3);
          queryClient.invalidateQueries({ queryKey: ['recursos'] });
        }, calculateTimeForBuildingPozo(3));
        intervalRefs.current.push(intervalId);
      }else if (edificioSeleccionado.id === 2){
        const intervalId = setInterval(async () => {
          await generarRecursosCriadero(1002, 3);
          queryClient.invalidateQueries({ queryKey: ['recursos'] });
        }, calculateTimeForBuildingCriadero(3));
        intervalRefs.current.push(intervalId);
      }else if (edificioSeleccionado.id === 3){
        const intervalId = setInterval(async () => {
          await generarRecursosChatarra(1002, 3);
          queryClient.invalidateQueries({ queryKey: ['recursos'] });
        }, calculateTimeForBuildingChatarra(3));
        intervalRefs.current.push(intervalId);
      }
    } catch (error) {
      console.error("Error al manejar la construcción del edificio:", error);
    }
  };

  return {
    handleConstruccion,
  };
};
