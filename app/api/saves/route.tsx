import { connectDB } from "@/app/libs/gamedb";
import Partidas from "@/app/models/partidas";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB()

    const partidas = await Partidas.find()
    return NextResponse.json(partidas)
}