import { EdificioType } from "../models/edificios";
import partidas, { PartidaType } from "../models/partidas";

export const fetchSave = async (userId: number): Promise<PartidaType | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/saves/${userId}`);
    const data: PartidaType = await response.json()
    return data;
  } catch (error) {
    console.error("Error fetching partida:", error);
    return null;
  }
};


export const fetchSaveEdificios = async (base: boolean): Promise<EdificioType[] | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/buildings`);
    const data: EdificioType[] = await response.json()
    if (!base){
      data.shift();
    }
    //data.shift();
    return data;
  } catch (error) {
    console.error("Error fetching Edificios:", error);
    return null;
  }
};



export const updateSave = async (data: PartidaType): Promise<PartidaType | null> => {
  try {
    //console.log(data)
    const player_id = data.player_id
    const response = await fetch(`http://localhost:3000/api/saves/1002`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error actualizando partida: ${response.statusText}`);
    }

    const savedData: PartidaType = await response.json();
    return savedData;
  } catch (error) {
    console.error("Error posting partida:", error);
    return null;
  }
};