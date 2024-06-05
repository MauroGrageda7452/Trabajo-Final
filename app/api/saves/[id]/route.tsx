import { connectDB } from "@/app/libs/gamedb";
import Partidas from "@/app/models/partidas";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: {params: Params}) {
    const { id }= params
    await connectDB()
    const partida = await Partidas.findOne({ id: Number(id) })
    //console.log(partida)
    return NextResponse.json(partida)
}

export async function PATCH(request: Request, { params }: {params: Params}) {
    const { id }= params
    await connectDB()
    const data = await request.json()
    const partida = await Partidas.updateOne({ id: Number(id) }, {$set: data})
    return NextResponse.json(partida)
}