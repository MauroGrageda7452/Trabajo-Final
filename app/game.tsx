'use client'
import React, {useState, useEffect} from "react";
import Map from "./componentes/Map";
import { getEdificioList } from "./services/edificios-menu";
import { getRecursoList } from "./services/recursos";
import { PartidaType } from "./models/partidas";
import edificios, { EdificioType } from "./models/edificios";
import { fetchSave } from "./services/partida-seleccionada";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { generarRecursosAgua } from "./componentes/Edificios-funcional/pozo-fun";
import { generarRecursosComida } from "./componentes/Edificios-funcional/criadero-fun";
import { generarRecursosChatarra } from "./componentes/Edificios-funcional/chatarreria-fun";
const Game: React.FC = () => {
  const [recursosData, setRecursosData] = useState<PartidaType['recursos'] | null>(null);
  const [edificiosData, setEdificiosData] = useState<EdificioType[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();
  const [buildingImages , setBuildingImages] = useState<string[] | null>(null)

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
          const fetchedEdificios = await getEdificioList(true);
          setEdificiosData(fetchedEdificios || []);
          const terreno = saveData.terreno;
          if (terreno && typeof terreno === 'object') {
            const newBuildingImages = Object.keys(terreno).map(key => {
              const buildingId = terreno[key];
              const edificio = fetchedEdificios?.find(edificio => edificio.id === buildingId);
              return edificio ? edificio.imagen : '';
            });
            setBuildingImages(newBuildingImages);
          }
          if (fetchedEdificios)
          if (fetchedEdificios[1] && fetchedEdificios[2] && fetchedEdificios[3]){
            await Promise.all([
              //console.log(edificios[3].name),
              generarRecursosAgua(userId, fetchedEdificios[1].nivel),
              generarRecursosComida(userId, fetchedEdificios[2].nivel),
              generarRecursosChatarra(userId, fetchedEdificios[3].nivel)
            ]);
          }

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
        <Map recursos={recursosData} buildingImages={buildingImages} edificios={edificiosData} onRecursosUpdate={handleRecursosUpdate} partida={Number(userId)} />
    </main>
  );
}

export default Game;
