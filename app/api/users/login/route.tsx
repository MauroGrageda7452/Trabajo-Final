import { connectDB } from "@/app/libs/gamedb";
import Usuarios from "@/app/models/usuarios";
import { NextResponse } from "next/server";
import argon2 from 'argon2';

export async function POST(request: Request) {
    const { username, password } = await request.json(); // Obtener los datos de usuario y contraseña del cuerpo de la solicitud
    await connectDB();

    // Buscar el usuario en la base de datos por el nombre de usuario
    const usuario = await Usuarios.findOne({ username });

    if (!usuario) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Comparar la contraseña hasheada almacenada con la contraseña proporcionada por el usuario
    const validPassword = await argon2.verify(usuario.password, password);
    if (!validPassword) {
        return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    // Si la contraseña es válida, retornar el usuario
    return NextResponse.json({ userId: usuario.id, message: "Login successful" });
}

