import { connectDB } from "@/app/libs/gamedb";
import Usuarios from "@/app/models/usuarios";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { updateSave } from "@/app/services/partida-seleccionada";

export async function POST(request: Request) {
    const { username, password} = await request.json(); // Obtener los datos de usuario y contraseña del cuerpo de la solicitud
    await connectDB();

    // Buscar el usuario en la base de datos por el nombre de usuario
    const usuario = await Usuarios.findOne({ username});
    // const {idPlayer} = await Usuarios.findOne({id});

    console.log(usuario);
    if (!usuario) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Comparar la contraseña hasheada almacenada con la contraseña proporcionada por el usuario
    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
        return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }
    const data = await updateSave(usuario.id);
    console.log(data)


    // Si la contraseña es válida, retornar el usuario
    return NextResponse.json({ userId: usuario.id, message: "Login successful" });
}
