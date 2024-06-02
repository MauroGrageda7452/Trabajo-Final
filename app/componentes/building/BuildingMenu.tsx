import { fetchSave, updateSave } from "@/app/services/partida-seleccionada";
import { useBuildingImages, useEdificios } from "@/app/hook/edficiosConQuery";
import { useRecursos } from "@/app/hook/recursosConQuery";

interface Props {
  onItemClick: (index: number) => void;
  playerId: number; //para identificar al jugador
  // edificios: EdificioType[];
  // onRecursosUpdate: (updatedRecursos: { agua_jugador: number; comida_jugador: number; chatarra_jugador: number }) => void;
  indiceTerreno : number;
  //terrenoBool : Record<string, boolean>;
}

const BuildingMenu: React.FC<Props> = ({onItemClick, playerId, indiceTerreno}) => {


  const { recursosData, recursosLoading, recursosError, handleRecursosUpdate } = useRecursos();
  const { edificiosData, edificiosLoading, edificiosError } = useEdificios();
  const {buildingImages, actualizarBuildingMutation} = useBuildingImages();

  const handleItemClick = async (index: number) => {
  if (edificiosData && buildingImages){
    const edificioSeleccionado = edificiosData[index] ;
    const { agua, comida, chatarra } = edificioSeleccionado.costoRecursoscreacion;

  
  if (!recursosData) {
    console.error("Recursos no cargados");
    return;
  }
  const { agua_jugador, comida_jugador, chatarra_jugador } = recursosData;
  
  try {
    // Verificar si hay suficientes recursos para construir el edificio
    if (agua_jugador < agua || comida_jugador < comida || chatarra_jugador < chatarra) {
      console.error("No hay suficientes recursos para construir el edificio.");
      return;
    }

    await onItemClick(index);

    const partidaActual = await fetchSave(1000);
    if (!partidaActual) {
        throw new Error('No se encontró la partida del jugador.');
    }
    let i = 0
    console.log(index)
    for (const key in partidaActual.terreno){
      if (partidaActual.terreno[key] === -1 ){
        partidaActual.terreno[key] = edificioSeleccionado.id; // Reemplaza -1 con el ID del edificio seleccionado
        await actualizarBuildingMutation.mutateAsync({src: edificioSeleccionado.imagen, index: i})
        break;
      }
      i++
    }    

    await updateSave(partidaActual);
    
    const recursosActualizados = {
      agua_jugador : agua_jugador - agua,
      comida_jugador : comida_jugador - comida,
      chatarra_jugador : chatarra_jugador - chatarra,
    };
    await handleRecursosUpdate(recursosActualizados.agua_jugador, recursosActualizados.comida_jugador, recursosActualizados.chatarra_jugador); 

  
  } catch (error) {
    console.error("Error al crear el edificio:", error);
  }
}
};


  
  return (
    <div className="p-5">
      {edificiosData?.map((edificiosData, index) => (
        <div
          key={edificiosData.id}
          className={`item-text bg-black cursor-pointer hover:bg-opacity-50 `}
          onClick={() => handleItemClick(index)} // Aquí llamamos a la función handleItemClick en lugar de onItemClick directamente
        >
           {`${edificiosData.name} : ${edificiosData.descripcion}`}

        </div>
      ))}
    </div>
  );
};

export default BuildingMenu;



  // const [edificiosList, setEdificiosList] = useState<EdificioType[]>([]);
  //const [recursos, setRecursos] = useState<{ agua_jugador: number, comida_jugador: number, chatarra_jugador: number } | null>(null);
  // useEffect(() => {
  //   const cargarRecursos = async () => {
  //     try {
  //       const recursosJugador = await getRecursoList();
  //       setRecursos(recursosJugador);
  //     } catch (error) {
  //       console.error("Error al cargar recursos:", error);
  //     }
  //   };
  //   //console.log(terrenoBool)

  //   const fetchBuildings = async () => {
  //     const response = await fetch("http://localhost:3000/api/buildings");
  //     const data: EdificioType[] = await response.json();
  //     data.shift();
  //     setEdificiosList(data);
  //   };

  //   cargarRecursos();
  //   fetchBuildings();
  // }, [playerId]);