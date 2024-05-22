'use client'
import React, {useState,useEffect} from "react";
import Map from "./componentes/Map";
import { getEdificioList } from "./services/edificios-menu";
import { getRecursoList } from "./services/recursos";
import { PartidaType } from "./models/partidas";
import { EdificioType } from "./models/edificios";
import Login from "./pages/login";
import Register from "./pages/register";


export default function Home() {
  const [recursosData, setRecursosData] = useState<PartidaType['recursos'] | null>(null);
  const [edificiosData, setEdificiosData] = useState<EdificioType[]>([]);
  const [showLogin, setShowLogin] = useState(true); // Para agregar a lo nuevo
  const [showRegister, setShowRegister] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try{
        const response = await getRecursoList();
        setRecursosData(response);
        const fetchedEdificios = await getEdificioList();
        setEdificiosData(fetchedEdificios || []);
    
      }catch(error){
        console.error(error);
      }
    };
    fetchData();
    //const intervalId = setInterval(fetchData);
  }, []);
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
  
  const handleRecursosUpdate = (updateRecursos: PartidaType['recursos']) => {
    setRecursosData(updateRecursos);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">  
      {showLogin && <Login onLogin={handleLogin} onRegister={handleRegister} />}
      {showRegister && <Register onRegister={() => {setShowRegister(false); setShowLogin(true);}} />}
      {showMap && (
        recursosData && (
          <Map recursos={recursosData} edificios={edificiosData} onRecursosUpdate={handleRecursosUpdate} />
        )
      )}
    </main>
  );
  
}
