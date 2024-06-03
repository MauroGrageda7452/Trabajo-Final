import { fetchSave, updateSave } from "@/app/services/partida-seleccionada";
import { useBuildingImages, useEdificios } from "@/app/hook/edficiosConQuery";
// import { useRecursos } from "@/app/hook/recursosConQuery";
import { useConstruccion } from "@/app/hook/useConstruccion";


interface Props {
  onItemClick: (index: number) => void;
  playerId: number; //para identificar al jugador
  // edificios: EdificioType[];
  // onRecursosUpdate: (updatedRecursos: { agua_jugador: number; comida_jugador: number; chatarra_jugador: number }) => void;
  indiceTerreno : number;
  //terrenoBool : Record<string, boolean>;
}

const BuildingMenu: React.FC<Props> = ({onItemClick, playerId, indiceTerreno}) => {
  

  // const { recursosData, recursosLoading, recursosError, handleRecursosUpdate } = useRecursos();
  const { edificiosData, edificiosLoading, edificiosError } = useEdificios();
  const {buildingImages, actualizarBuildingMutation} = useBuildingImages();
  const { handleConstruccion } = useConstruccion();

  const handleItemClick = async (index: number) => {
    await handleConstruccion(index, () => onItemClick(index) );
  }


  
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
