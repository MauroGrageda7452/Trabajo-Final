'use client'
import React, {useState,useEffect} from "react";
import Map from "./componentes/Map";
import Login from "./pages/login";
import Register from "./pages/register";

export default function Home() {
  const [showLogin, setShowLogin] = useState(true); // Para agregar a lo nuevo
  const [showRegister, setShowRegister] = useState(false);
  const [showMap, setShowMap] = useState(false); // este cambio a true
  const [userId, setUserId] = useState<number>(-1);



  const handleLogin = (userId: string) => {
    setUserId(Number(userId))
    //console.log(userId)
    setShowLogin(false);
    setShowRegister(false);
    setShowMap(true);
  }; 

  const handleRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
    setShowMap(false); 
  }; 
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">  
      {showLogin && <Login onLogin={handleLogin} onRegister={handleRegister} />}
      {showRegister && <Register onRegister={() => {setShowRegister(false); setShowLogin(true);}} />}
      {showMap && (
          <Map partidaJugadorId= {userId}/>
        )
      } 
      
      

    </main>
  );
  
}
