import { getRecursoList } from "../services/recursos";
import { useQuery,useMutation, useQueryClient} from "@tanstack/react-query";
import { actualizarRecursoJugador } from "../services/recursos";

export const useRecursos = () => {
    const queryClient = useQueryClient()

    const { data: recursosData, isLoading: recursosLoading, isError: recursosError } = useQuery({
        queryKey: ['recursos'],
        queryFn: () => getRecursoList(),
    });
    const actualizarRecursosMutation = useMutation({
        mutationFn: (recurso: { name: string, cantidad: number }) => actualizarRecursoJugador(recurso),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['recursos']});
        },
    });

    const handleRecursosUpdate = async (agua_jugador: number, comida_jugador: number, chatarra_jugador: number ) => {
        try{
            await Promise.all([
                actualizarRecursosMutation.mutateAsync({ name: 'agua', cantidad: agua_jugador }),
                actualizarRecursosMutation.mutateAsync({ name: 'comida', cantidad: comida_jugador }),
                actualizarRecursosMutation.mutateAsync({ name: 'chatarra', cantidad: chatarra_jugador })
            ]);
            
        }catch(error){
        console.error('Error al actualizar recursos', error)
        }
    };

    return {
        recursosData, 
        recursosLoading,
        recursosError,
        handleRecursosUpdate,
    };
};
