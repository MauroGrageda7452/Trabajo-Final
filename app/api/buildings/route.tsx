import { connectDB } from "@/app/libs/gamedb";
import Edificios from "@/app/models/edificios";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB()

    const edificios = await Edificios.find()
    return NextResponse.json(edificios)
}