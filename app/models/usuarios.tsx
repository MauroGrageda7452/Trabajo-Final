import mongoose from "mongoose";

export type UsuarioType = {
    id: number,
    username: string,
    email: string,
    password: string
}

const schema = new mongoose.Schema<UsuarioType>({
    id: Number,
    username: String,
    email: String,
    password: String
})
export default mongoose.models.Usuarios || mongoose.model('Usuarios', schema)