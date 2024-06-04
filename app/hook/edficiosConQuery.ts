import { useQuery,useMutation, useQueryClient} from "@tanstack/react-query";
import { getEdificioList } from "../services/edificios-menu";
import { fetchSave } from "../services/partida-seleccionada";

export const useEdificios = () => {

    const { data: edificiosData, isLoading: edificiosLoading, isError: edificiosError } = useQuery({
        queryKey: ['edificios'],
        queryFn: () => getEdificioList(false),
    });
    return {
        edificiosData, 
        edificiosLoading,
        edificiosError,
    };
};



const fetchBuildingsImages = async(playerid: number) => {

    const edificiosData = await getEdificioList(true);
    const partida = await fetchSave(playerid);
    const terreno = partida?.terreno;
  
    if (terreno && typeof terreno === 'object') {
      const buildingImages: string[] = [];
      for (const key in terreno) {
        if (Object.prototype.hasOwnProperty.call(terreno, key)) {
          const element = terreno[key];
          const edificio = edificiosData?.find(edificio => edificio.id === element);
          buildingImages.push(edificio ? edificio.imagen : '');
        }
      }
      return buildingImages;
    }
    return [];
}



export const useBuildingImages = (playerid : number) => {
    const queryClient = useQueryClient();

    const {data: buildingImages, isLoading, isError } = useQuery({
        queryKey: ['buildingImages']
        , queryFn : () => fetchBuildingsImages(playerid),
    });

    const actualizarBuildingMutation = useMutation({
        mutationFn: async (buildingimage: { src: string , index:number}) => {return actualizarBuilding(buildingimage.src, buildingimage.index)},
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['buildingImages']});
        },
    });

    const actualizarBuilding = async (src: string, index: number) : Promise<string[]>  => {
        if (buildingImages) {
            const updatedImages = [...buildingImages];
            updatedImages[index] = src;
            return updatedImages;
        }
        return []
    };


    return {
        buildingImages, actualizarBuildingMutation 
    };
}





