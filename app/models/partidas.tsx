import mongoose , {Schema} from "mongoose";

export type EdificioTerrenoType = {
    edificio_id: number;
    edificio_nivel: number;
    edficio_trabajadores?: number;
  };
  
export type TerrenoType = {
    [key: string]: EdificioTerrenoType;
};

export type PartidaType = {
    id: number,
    recursos:{
        agua_jugador: number,
        comida_jugador: number,
        chatarra_jugador: number,
        trabajadores_jugador:number,
    } | null ,
    //terreno:{
        //type: Record<string, number>
        //[key:string] : object
      //  terreno: TerrenoType;
    //}
    terreno: TerrenoType;
}

const edificioTerrenoSchema = new Schema<EdificioTerrenoType>({
    edificio_id: { type: Number, required: true },
    edificio_nivel: { type: Number, required: false },
    edficio_trabajadores: { type: Number, required: false },
}, { _id: false });

const schema = new mongoose.Schema<PartidaType>({
    id: Number,
    recursos:{
        agua_jugador: Number,
        comida_jugador: Number,
        chatarra_jugador: Number,
        trabajadores_jugador: Number,
    },
    //terreno:{
        // type: Map,
        // of: Object
    // }
    terreno: {
        type: Map,
        of: edificioTerrenoSchema,
    }})
export default mongoose.models.Partidas || mongoose.model('Partidas', schema)