import { connectDB } from "@/app/libs/gamedb";
import Usuarios from "@/app/models/usuarios";
import Partidas from "@/app/models/partidas";
import argon2 from 'argon2';
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await connectDB();
    const data = await request.json();
    
    const highestIdUser = await Usuarios.findOne().sort({ id: -1 }).exec(); // Primer documento de la lista de ids de usuarios ordenada de mayor a menor
    const newId = highestIdUser ? highestIdUser.id + 1 : 1;


    const existingUser = await Usuarios.findOne({ username: data.username });
    if (existingUser) {
        return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
    }

    const hashedPassword = await argon2.hash(data.password, { type: argon2.argon2id });

    const newUser = new Usuarios({
        id: newId,
        username: data.username,
        email: data.email,
        password: hashedPassword
    });

    try {
        const savedUser = await newUser.save();
        const newPartida = new Partidas({
            id : newId,
            recursos:{
                agua_jugador: 500,
                chatarra_jugador : 500,
                comida_jugador: 500,
                trabajadores_jugador : 5,
            },
            terreno: { 
                base: {
                    edificio_id: 0,
                    edificio_nivel: 1, 
                    edficio_trabajadores: 0
                },
                pos1: {
                    edificio_id: -1,
                    edificio_nivel: 0, 
                    edficio_trabajadores: 0
                },
                pos2: {
                    edificio_id: -1,
                    edificio_nivel: 0, 
                    edficio_trabajadores: 0
                }  
            }
        });
        const savePartida = await newPartida.save();
        return NextResponse.json(savedUser,savePartida);
    } catch (error) {
        console.error('Error saving user:', error);
        return NextResponse.json({ error: 'Error saving user' }, { status: 500 });
    }
}