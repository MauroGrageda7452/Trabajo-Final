import { connectDB } from "@/app/libs/gamedb";
import Edificios from "@/app/models/edificios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: {params: Params}) {
    const { id }= params
    await connectDB()
    const edificio = await Edificios.findOne({ id: id })
    return NextResponse.json(edificio)
}

export async function PATCH(request: Request, { params }: { params: Params }) {
    const { id } = params;
    await connectDB();
  
    try {
      const newData = await request.json();
      const updatedEdificio = await Edificios.findOneAndUpdate({ id: parseInt(id) }, newData, { new: true });
  
      if (!updatedEdificio) {
        return NextResponse.json({ error: 'Edificio no encontrado' }, { status: 404 });
      }
  
      return NextResponse.json(updatedEdificio);
    } catch (error) {
      console.error("Error al actualizar el edificio:", error);
      return NextResponse.json({ error: 'Error al actualizar el edificio' }, { status: 500 });
    }
  }