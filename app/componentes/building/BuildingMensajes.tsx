import React, { useState, useEffect } from "react";
import { UsuarioType } from "@/app/models/usuarios";
import { getUsuarioList } from "@/app/services/users";
import PanelIzquierdo from "./Mensajes-UI/LeftPanel";
import PanelDerecho from "./Mensajes-UI/RightPanel";
import Cookies from 'js-cookie';

interface Props {

}

const BuildingMensajes: React.FC<Props> = ({  }) => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [usuarios, setUsuarios] = useState<UsuarioType[] | null>(null);
  const userId = Cookies.get('userId');
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);


  useEffect(() => {
    async function fetchUsuarios() {
      const users = await getUsuarioList();
      setUsuarios(users);
    }
    fetchUsuarios();
  }, []);

  // const handleSendMessage = () => {
  //   if (selectedUser !== null) {
  //     const currentDate = new Date(); // Obtener la fecha y hora actual
  
  //     console.log('ID de usuario:', userId);
  //     console.log("Mensaje enviado al usuario con ID:", selectedUser);
  //     console.log("Texto:", messageText);
  //     console.log("Fecha y hora de envío:", currentDate); // Mostrar la fecha y hora en la consola
  //   } else {
  //     console.log("No se ha seleccionado ningún usuario.");
  //   }
  // };

  const handleSendMessage = async () => {
    if (selectedUser !== null) {
      const currentDate = new Date(); // Obtener la fecha y hora actual
  
      try {
        // Construir el cuerpo de la solicitud POST
        const requestBody = {
          id_sender: userId,
          id_reciever: selectedUser,
          text: messageText,
          date: currentDate.toString()
        };
  
        // Hacer la solicitud POST al servidor
        const response = await fetch('../../api/users/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
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
        <div className="col-span-2">
          <PanelDerecho messages={messages} onSendMessage={handleSendMessage} messageText={messageText} setMessageText={setMessageText}  selectedUser={selectedUser} setMessages={setMessages} />
          <div className="mt-4">
          </div>
        </div>
      </div>
    </div>
  );
};


export default BuildingMensajes;