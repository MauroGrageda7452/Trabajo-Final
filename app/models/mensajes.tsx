import mongoose from "mongoose";

export type MensajeType = {
    id: number;
    id_sender: string;
    id_reciever: string;
    text: string;
    date: Date;
}

const schema = new mongoose.Schema<MensajeType>({
    id: Number,
    id_sender: String,
    id_reciever: String,
    text: String,
    date: Date
});

export default mongoose.models.Mensaje || mongoose.model('Mensaje', schema);