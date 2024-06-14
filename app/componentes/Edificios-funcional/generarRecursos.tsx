import { fetchSave, updateSave } from "@/app/services/partida-seleccionada";

const calculateTimeForBuilding = (nivel: number): number => {
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

const calculateAmountForBuilding = (nivel: number): number => {
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

export const generarRecursos = async (playerId: number, handleRecursosUpdate: Function) => {
  const intervalo = calculateTimeForBuilding(1);
  const cantidadRecursoConseguido = calculateAmountForBuilding(1);
  console.log("Intervalo:", intervalo); // Agrega este console.log para verificar el intervalo


  const generarRecursosRecursive = async () => {
    const partida = await fetchSave(playerId);
    console.log("Función generarRecursosRecursive llamada"); // Agrega este console.log para verificar si se llama a esta función


    if (!partida || !partida.recursos) {
      console.error('Partida o recursos no encontrados');
      return;
    }

    const terreno = partida.terreno;

    for (const key in terreno) {
      const edificioId = terreno[key].edificio_id;
      if (edificioId === 1) {
        partida.recursos['agua_jugador'] += cantidadRecursoConseguido; // Incrementa el recurso
      }else if (edificioId === 2 ){
        partida.recursos['comida_jugador'] += cantidadRecursoConseguido; // Incrementa el recurso
      }else if (edificioId === 3){
        partida.recursos['chatarra_jugador'] += cantidadRecursoConseguido; // Incrementa el recurso
      }
    }
    handleRecursosUpdate(partida.recursos);
    await updateSave(partida);

    // Llama recursivamente a la función después de un intervalo de tiempo
    setTimeout(generarRecursosRecursive, intervalo);
  };

    // Llama a la función inicialmente para comenzar el proceso de generación de recursos
    setTimeout(generarRecursosRecursive, intervalo);
    
  };