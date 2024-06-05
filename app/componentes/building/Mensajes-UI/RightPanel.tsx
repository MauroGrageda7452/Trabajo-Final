import React, { useState, useEffect } from "react";

interface PanelDerechoProps {
  messages: { text: string; sender: string }[];
  onSendMessage: (message: string) => void;
  messageText: string; 
  setMessageText: React.Dispatch<React.SetStateAction<string>>;
  selectedUser: number | null;
  setMessages: React.Dispatch<React.SetStateAction<{ text: string; sender: string }[]>>;
}

const PanelDerecho: React.FC<PanelDerechoProps> = ({ messages, onSendMessage, messageText, setMessageText, selectedUser, setMessages  }) => {
    const handleSendMessage = () => {
      if (messageText.trim()) {
        onSendMessage(messageText);
        setMessageText("");
      }
    };

    useEffect(() => {
        const fetchMessages = async () => {
          try {
            if (selectedUser !== null) {
              const response = await fetch(` ../../api/users/messages?id_reciever=${selectedUser}` );
              if (response.ok) {
                const data = await response.json();
                setMessages(data);
              } else {
                throw new Error("Error al cargar los mensajes");
              }
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchMessages();
      }, [selectedUser, setMessages]);
  
      return (
        <div className="bg-gray-300 p-4 rounded-lg flex flex-col h-full">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Mensajes</h2>
          <div className="flex-1 overflow-y-auto mb-4 space-y-2">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={` p-2 rounded-lg ${message.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-600 text-white"}` }
            >
                    <strong>{message.sender}:</strong> {message.text}
                </div>
            ))}
            </div>
          {/* <h3 className="font-bold mt-4 mb-2 text-gray-800">Mensajes Enviados:</h3> */}
          <div className="overflow-y-auto space-y-2">
            {messages.filter(message => message.sender === "me").map((message, index) => (
              <div
                key={index}
                className="p-2 rounded-lg bg-blue-500 text-white"
              >
                <strong>{message.sender}:</strong> {message.text}
              </div>
            ))}
          </div>
          {/* <h3 className="font-bold mt-4 mb-2 text-gray-800">Mensajes Recibidos:</h3>
          <div className="overflow-y-auto space-y-2">
            {messages.filter(message => message.sender !== "me").map((message, index) => (
              <div
                key={index}
                className="p-2 rounded-lg bg-gray-600 text-white"
              >
                <strong>{message.sender}:</strong> {message.text}
              </div>
            ))}
          </div> */}
          <div className="flex items-center">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md mr-2 text-gray-800"
              style={{ height: "30px" }}
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-1 bg-blue-600 text-white rounded-md"
              style={{ height: "30px" }}
            >
              Enviar
            </button>
          </div>
        </div>
      );
  };
  

export default PanelDerecho;