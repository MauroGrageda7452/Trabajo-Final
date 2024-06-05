'use client'
import React, {useState,useEffect, use} from "react";
import Map from "./componentes/Map";
import Login from "./login/page";
import Register from "./register/page";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const Game: React.FC = () => { 
//const [showLogin, setShowLogin] = useState(true); // Para agregar a lo nuevo
  //const [showRegister, setShowRegister] = useState(false);
  //const [showMap, setShowMap] = useState(false); // este cambio a true
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = Cookies.get('userId');
    if (storedUserId) {
      setUserId(Number(storedUserId));
    } else {
      // Redirigir automáticamente a /login si no hay userId en las cookies
      router.push('/login');
    }
  }, [router])

  

  return (
    <main>  
      {/* {userId &&( */}
          <Map partidaJugadorId= {userId}/>
        {/* ) */}
      {/* }  */}
    </main>
  );
  
}

export default Game;


//   const handleLogin = (userId: string) => {
//     setUserId(Number(userId))
//     //console.log(userId)
//     //console.log(userId)
//     setShowLogin(false);
//     setShowRegister(false);
//     setShowMap(true);
//   }; 




// const handleRegister = () => {
//     setShowLogin(false);
//     setShowRegister(true);
//     setShowMap(false); 
//   }; 