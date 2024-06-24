import React, { useState, useEffect } from "react";
import { UsuarioType } from "@/app/models/usuarios";
import { getUsuarioList } from "@/app/services/users";
import PanelIzquierdo from "./Mensajes-UI/LeftPanel";
import PanelDerecho from "./Mensajes-UI/RightPanel";
import SendResourcesPanel from "./Mensajes-UI/SendResourcePanel";
import Cookies from 'js-cookie';
import { getRecursoList, actualizarRecursoJugador, actualizarRecursoJugadorRestar } from "@/app/services/recursos";

interface Props {}

const BuildingMensajes: React.FC<Props> = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [usuarios, setUsuarios] = useState<UsuarioType[] | null>(null);
  const userId = Cookies.get('userId');
  const [messages, setMessages] = useState<{ text: string; sender: string; date: string }[]>([]);
  const [recursos, setRecursos] = useState<{ agua_jugador: number, comida_jugador: number, chatarra_jugador: number, trabajadores_jugador:number } | null>(null);

  useEffect(() => {
    async function fetchUsuarios() {
      const users = await getUsuarioList();
      setUsuarios(users);
    }
    async function fetchRecursos() {
      const partidaId = 1; // Asume que tienes una manera de obtener el ID de la partida actual
      const recursos = await getRecursoList({ agua_jugador: 100, comida_jugador: 100, chatarra_jugador: 100, trabajadores_jugador: 10 }); // Reemplaza con datos reales
      setRecursos(recursos);
    }
    fetchUsuarios();
    fetchRecursos();
  }, []);

  const handleSendMessage = async () => {
    if (selectedUser !== null) {
      const currentDate = new Date(); // Obtener la fecha y hora actual
      try {
        const requestBody = {
          id_sender: userId,
          id_reciever: selectedUser,
          text: messageText,
          date: currentDate.toString(),
        };
        const response = await fetch('/api/users/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
          throw new Error('Error al enviar el mensaje');
        }
        console.log('Mensaje enviado con éxito');
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    } else {
      console.log("No se ha seleccionado ningún usuario.");
    }
  };

  const handleSendResources = async (recipientId: number, resource: string, quantity: number, jugadorEnviadorId : number) => {
    try {
      const partidaId = recipientId; // Asume que tienes una manera de obtener el ID de la partida actual
      await Promise.all([
        actualizarRecursoJugador({ name: resource, cantidad: quantity }, recipientId),
        actualizarRecursoJugadorRestar({ name: resource, cantidad: quantity }, jugadorEnviadorId),
      ]);
      console.log('Recursos enviados con éxito');
    } catch (error) {
      console.error('Error al enviar los recursos:', error);
    }
  };

  const handleUserClick = (userId: number) => {
    setSelectedUser(userId);
    console.log("Usuario seleccionado:", userId);
  };

  return (
    <div>
      <div className="container mx-auto p-4 grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <PanelIzquierdo usuarios={usuarios || []} onUserClick={handleUserClick} />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <PanelDerecho
            messages={messages}
            onSendMessage={handleSendMessage}
            messageText={messageText}
            setMessageText={setMessageText}
            selectedUser={selectedUser}
            setMessages={setMessages}
          />
          <SendResourcesPanel playerId={userId} usuarios={usuarios || []} onSendResources={handleSendResources} />
        </div>
      </div>
    </div>
  );
};

export default BuildingMensajes;