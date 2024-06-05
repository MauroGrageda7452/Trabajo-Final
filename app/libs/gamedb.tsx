import mongoose from "mongoose";

export async function connectDB() {
    const mongodbUrl = process.env.MONGODB_URL;

    if (!mongodbUrl) {
        throw new Error("La variable de entorno MONGODB_URL no está definida");
    }

    await mongoose.connect(mongodbUrl);
    // console.log("MongoDB conectado")
}
 