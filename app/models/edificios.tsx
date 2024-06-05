import mongoose from "mongoose";

export type EdificioType = {
    id: number;
    name: string;
    descripcion: string;
    imagen: string;
    costoRecursoscreacion: {
        agua: number,
        comida: number,
        chatarra: number
    };
    nivel:number;
    trabajadores: number;
}

const schema = new mongoose.Schema<EdificioType>({
    id: Number,
    name: String,
    descripcion: String,
    imagen: String,
    costoRecursoscreacion: {
        agua: Number,
        comida: Number,
        chatarra: Number
    },
    nivel: Number,
    trabajadores: Number,
});

export default mongoose.models.Edificios || mongoose.model('Edificios', schema);