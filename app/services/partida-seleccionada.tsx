import { EdificioType } from "../models/edificios";
import partidas, { PartidaType } from "../models/partidas";
import { UsuarioType } from "../models/usuarios";

export const fetchSave = async (userId: number | null): Promise<PartidaType | null> => {
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
    if (!base) data.shift();

    return data;
  } catch (error) {
    console.error("Error fetching Edificios:", error);
    return null;
  }
};



export const updateSave = async (data: PartidaType): Promise<PartidaType | null> => {
  try {
    // console.log(data)
    const player_id = data.id
    // console.log(player_id)
    const response = await fetch(`http://localhost:3000/api/saves/${player_id}`, {
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


export const actualizarEdificio = async (edificioId: number, newData: Partial<EdificioType>): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:3000/api/buildings/${edificioId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      const errorMessage = `Error al actualizar el edificio: ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const savedData: EdificioType = await response.json();
    return true;
  } catch (error) {
    console.error("Error al actualizar el edificio:", error);
    return false;
  }
};

export const fetchSaveUsuarios = async (): Promise<UsuarioType[] | null> => {
  try {
    const response = await fetch('http://localhost:3000/api/users'); // Ruta del endpoint que devuelve la lista de usuarios
    //console.log(response)
    if (!response.ok) {
      throw new Error('Error al obtener la lista de usuarios');
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error);
    return null;
  }
};