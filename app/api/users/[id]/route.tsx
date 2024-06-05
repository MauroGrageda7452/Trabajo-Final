import { connectDB } from "@/app/libs/gamedb";
import Usuarios from "@/app/models/usuarios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: {params: Params}) {
    const { id }= params
    await connectDB()
    const usuarios = await Usuarios.findOne({ id: Number(id) })
    //console.log(partida)
    return NextResponse.json(usuarios)
}

export async function PATCH(request: Request, { params }: {params: Params}) {
    const { id }= params
    await connectDB()
    const data = await request.json()
    const usuarios = await Usuarios.updateOne({ id: Number(id) }, {$set: data})
    return NextResponse.json(usuarios)
}