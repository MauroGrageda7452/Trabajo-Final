'use client'
import React, {useState,useEffect} from "react";
import Map from "./componentes/Map";
import { getEdificioList } from "./services/edificios-menu";
import { actualizarRecursoJugador, getRecursoList } from "./services/recursos";
import { PartidaType } from "./models/partidas";
import { EdificioType } from "./models/edificios";
import Login from "./pages/login";
import Register from "./pages/register";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

export default function Home() {
  // const [recursosData, setRecursosData] = useState<PartidaType['recursos'] | null>(null);
  const [edificiosData, setEdificiosData] = useState<EdificioType[]>([]);
  const [showLogin, setShowLogin] = useState(true); // Para agregar a lo nuevo
  const [showRegister, setShowRegister] = useState(false);
  const [showMap, setShowMap] = useState(true); // este cambio a true

  const { data: recursosData, isLoading: recursosLoading, isError: recursosError } = useQuery({
    queryKey: ['recursos'],
    queryFn: () => getRecursoList(),
  });
  const actualizarRecursosMutation = useMutation({
    mutationFn: (recurso: { name: string, cantidad: number }) => actualizarRecursoJugador(recurso),
  });
  const queryClient = useQueryClient()

  const handleRecursosUpdate = async (updateRecursos: PartidaType['recursos']) => {
    try{
      if (updateRecursos){
        // Actualizar recurso agua
        await actualizarRecursosMutation.mutateAsync({ name: 'agua', cantidad: updateRecursos.agua_jugador });
        // Actualizar recurso comida
        await actualizarRecursosMutation.mutateAsync({ name: 'comida', cantidad: updateRecursos.comida_jugador });
        // Actualizar recurso chatarra
        await actualizarRecursosMutation.mutateAsync({ name: 'chatarra', cantidad: updateRecursos.chatarra_jugador });
    
        queryClient.invalidateQueries({queryKey:['recursos']});  
      }
      }catch(error){
      console.error('Error al actualizar recursos', error)
    }
  };

  // useEffect(() => {

  //   const fetchData = async () => {
  //     try{
  //       const response = await getRecursoList();
  //       setRecursosData(response);
  //       const fetchedEdificios = await getEdificioList();
  //       setEdificiosData(fetchedEdificios || []);
    
  //     }catch(error){
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  //   //const intervalId = setInterval(fetchData);
  // }, []);
  //window.location.reload();
  
  const handleLogin = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowMap(true);
  }; 

  const handleRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
    setShowMap(false); 
  }; 
  
  // const handleRecursosUpdate = (updateRecursos: PartidaType['recursos']) => {
  //   setRecursosData(updateRecursos);
  //   console.log(recursosData)

  // };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">  
      {/* {showLogin && <Login onLogin={handleLogin} onRegister={handleRegister} />} */}
      {/* {showRegister && <Register onRegister={() => {setShowRegister(false); setShowLogin(true);}} />} */}
      {/* {showMap && (
        recursosData && (
          <Map recursos={recursosData}edificios={edificiosData} onRecursosUpdate={handleRecursosUpdate} />
        )
      )} */}
      {recursosLoading? (
          <div>Cargando...</div>
        ) : recursosError ? (
          <div>Error al cargar recursos o edificios</div>
        ) : (
          <Map recursos={recursosData ?? null} edificios={edificiosData} onRecursosUpdate={handleRecursosUpdate} />
        )}

    </main>
  );
  
}
