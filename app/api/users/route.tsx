import { connectDB } from "@/app/libs/gamedb";
import Usuarios from "@/app/models/usuarios";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB()

    const usuarios = await Usuarios.find()
    return NextResponse.json(usuarios)
}