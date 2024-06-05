import { connectDB } from "@/app/libs/gamedb";
import Mensaje from "@/app/models/mensajes";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Conectar a la base de datos
    await connectDB();
    
    // Extraer los datos del cuerpo de la solicitud
    const { id_sender, id_reciever, text, date } = await request.json(); // Extraer directamente del JSON
    
    // Formatear la fecha según el formato deseado
    const formattedDate = new Date(date).toLocaleString("es-AR", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short"
      });
    // Crear un nuevo documento de mensaje
    console.log("Formatted Date:", formattedDate);
    const mensaje = new Mensaje({
      id_sender,
      id_reciever,
      text,
      date: new Date(date)
    });

    // Guardar el mensaje en la base de datos
    await mensaje.save();

    // Enviar una respuesta de éxito al cliente
    return NextResponse.json({ message: 'Mensaje enviado con éxito' });

  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    // Enviar una respuesta de error al cliente
    return NextResponse.json({ error: 'Error al guardar el mensaje' }, { status: 500 });
  }
}
