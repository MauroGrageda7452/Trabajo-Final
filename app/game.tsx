'use client'
import React, {useState, useEffect} from "react";
import Map from "./componentes/Map";
import { getEdificioList } from "./services/edificios-menu";
import { getRecursoList } from "./services/recursos";
import { EdificioTerrenoType, PartidaType } from "./models/partidas";
import edificios, { EdificioType } from "./models/edificios";
import { fetchSave, updateSave } from "./services/partida-seleccionada";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { generarRecursos} from "./componentes/Edificios-funcional/generarRecursos";


const Game: React.FC = () => {
  const [recursosData, setRecursosData] = useState<PartidaType['recursos'] | null>(null);
  const [edificiosData, setEdificiosData] = useState<EdificioType[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();
  const [buildingImages , setBuildingImages] = useState<string[] | null>(null)
  const [terrenoData, setTerrenoData] = useState<PartidaType['terreno'] | null>(null);


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
          //console.log(saveData.terreno['pos1']);
          //setTerrenoData(saveData.terreno);
          
          //console.log(saveData.terreno['base'])
          if (saveData.terreno && typeof saveData.terreno === 'object') {
            const newBuildingImages = Object.keys(saveData.terreno).map(key => {
              // Aseguramiento de tipo para saveData.terreno[key]
            const edificioTerreno = saveData.terreno[key] as EdificioTerrenoType;
            const buildingId = edificioTerreno.edificio_id;
            const edificio = fetchedEdificios?.find(edificio => edificio.id === buildingId);
            //console.log(edificio);
            //console.log(edificio?.niveles);
            if (edificio && edificio.niveles && edificio.niveles[edificioTerreno.edificio_nivel]) {
              const imagenEdif = edificio.niveles[edificioTerreno.edificio_nivel].imagen;
              return imagenEdif ? imagenEdif : '';
            } else {
              return '';
            }
          });

          setTerrenoData(saveData.terreno)
          setBuildingImages(newBuildingImages);
          }
          if (fetchedEdificios && fetchedRecursos) { // Verifica que los recursos estén disponibles antes de generarlos
          //   await Promise.all([
              //generarRecursos(userId, setRecursosData)
          //   ]);
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

  const handleTerrenoUpdate = (updateTerreno: PartidaType['terreno']) => {
    setTerrenoData(updateTerreno);
  }

  return (
    <main>
        <Map recursos={recursosData} onTerrenoUpdate={handleTerrenoUpdate} buildingImages={buildingImages} edificios={edificiosData} onRecursosUpdate={handleRecursosUpdate} partida={Number(userId)} terreno={terrenoData}/>
    </main>
  );
}

export default Game;
