import { UsuarioType } from "../models/usuarios"
import { fetchSaveUsuarios } from "./partida-seleccionada";



export const getUsuarioList = async (): Promise<UsuarioType[] | null> => {
    try {

      const users = await fetchSaveUsuarios();
      if(users){
      }
      //edificios_menu?.shift();
      return users;
    } catch (error) {
      console.error('Error al obtener la lista de edificios:', error);
      return null;
    }
  };