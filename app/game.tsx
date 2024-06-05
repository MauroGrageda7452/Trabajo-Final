'use client'
import React, {useState, useEffect} from "react";
import Map from "./componentes/Map";
import { getEdificioList } from "./services/edificios-menu";
import { getRecursoList } from "./services/recursos";
import { PartidaType } from "./models/partidas";
import { EdificioType } from "./models/edificios";
import { fetchSave } from "./services/partida-seleccionada";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const Game: React.FC = () => {
  const [recursosData, setRecursosData] = useState<PartidaType['recursos'] | null>(null);
  const [edificiosData, setEdificiosData] = useState<EdificioType[]>([]);
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
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const saveData = await fetchSave(userId);
        if (saveData) {
          const fetchedRecursos = await getRecursoList(saveData.recursos);
          setRecursosData(fetchedRecursos);
          const fetchedEdificios = await getEdificioList();
          setEdificiosData(fetchedEdificios || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);

  const handleRecursosUpdate = (updateRecursos: PartidaType['recursos']) => {
    setRecursosData(updateRecursos);
  };

  return (
    <main>
        <Map recursos={recursosData} edificios={edificiosData} onRecursosUpdate={handleRecursosUpdate} partida={Number(userId)} />
    </main>
  );
}

export default Game;
