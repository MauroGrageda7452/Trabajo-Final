import { connectDB } from "@/app/libs/gamedb";
import partidas from "@/app/models/partidas";
import Usuarios from "@/app/models/usuarios";
import {updateSave } from "@/app/services/partida-seleccionada";
import bcrypt from 'bcrypt';
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await connectDB();
    const data = await request.json();
    
    const highestIdUser = await Usuarios.findOne().sort({ id: -1 }).exec(); // Primer documento de la lista de ids de usuarios ordenada de mayor a menor
    const newId = highestIdUser ? highestIdUser.id + 1 : 1;

    const saltRounds = 10; // Número de rondas para generar el salt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const newUser = new Usuarios({
        id: newId,
        username: data.username,
        email: data.email,
        password: hashedPassword
    });

    try {
        const savedUser = await newUser.save();
        const newPartida = new partidas({
            id : newId,
            recursos:{
                agua_jugador: 500,
                chatarra_jugador : 500,
                comida_jugador: 500,
                trabajadores_jugador : 5,
            },
            terreno: { 
                base : 0,
                pos1: -1,
                pos2 : -1 
            }
        });
        const savePartida = await newPartida.save();
        return NextResponse.json(savedUser,savePartida);
    } catch (error) {
        console.error('Error saving user:', error);
        return NextResponse.json({ error: 'Error saving user' }, { status: 500 });
    }
}