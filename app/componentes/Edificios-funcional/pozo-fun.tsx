import { fetchSave, updateSave } from "@/app/services/partida-seleccionada";

const calculateTimeForBuildingPozo = (nivel: number): number => {
  switch (nivel) {
    case 1:
      return 30000; // 30 segundos
    case 2:
      return 15000; // 15 segundos
    case 3:
      return 10000; // 10 segundos
    default:
      return 30000; // Valor por defecto, 30 segundos
  }
};

const calculateAmountForBuildingPozo = (nivel: number): number => {
  switch (nivel) {
    case 1:
      return 25; // Nivel 1
    case 2:
      return 50; // Nivel 2
    case 3:
      return 75; // Nivel 3
    default:
      return 25; // Valor por defecto
  }
};

const generarRecursosAgua = async (playerId: number, nivel: number) => {
  const intervalo = calculateTimeForBuildingPozo(nivel);
  const cantidadRecursoConseguido = calculateAmountForBuildingPozo(nivel);


  setInterval(async () => {
    const partida = await fetchSave(playerId);

    if (!partida || !partida.recursos) {
      console.error('Partida o recursos no encontrados');
      return;
    }

    const terreno = partida.terreno;

    for (const key in terreno) {
      const edificioId = terreno[key];
      if (edificioId === 1) { 
        partida.recursos.agua_jugador += cantidadRecursoConseguido; // Incrementa el recurso de agua
      }
    }
    await updateSave(partida);
  }, intervalo);
};

export { generarRecursosAgua, calculateTimeForBuildingPozo, calculateAmountForBuildingPozo };