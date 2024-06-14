import mongoose from "mongoose";

export type NivelType = {
    costoRecursoscreacion: {
        agua: number,
        comida: number,
        chatarra: number
    }
    imagen: string;
};

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
    //nivel:number;
    niveles: { [key: number]: NivelType };
    // trabajadores: number;
}

const nivelSchema = new mongoose.Schema({
    costoRecursoscreacion: {
        agua: Number,
        comida: Number,
        chatarra: Number, 
        },
    imagen: String 
},{_id:false});



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
    //nivel: Number,
    niveles: { type: Map, of: nivelSchema}
    //trabajadores: Number,
});

export default mongoose.models.Edificios || mongoose.model('Edificios', schema);