// import mongoose from "mongoose";

// export async function connectDB() {
//     const mongodbUrl = process.env.MONGODB_URL;

//     if (!mongodbUrl) {
//         throw new Error("La variable de entorno MONGODB_URL no está definida");
//     }

//     await mongoose.connect(mongodbUrl);
//     // console.log("MongoDB conectado")
// }

import mongoose, { Connection } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL as string;

if (!MONGODB_URL) {
  throw new Error("La variable de entorno MONGODB_URL no está definida");
}

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

global.mongoose = cached;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL).then((connection) => {
      return connection;
    }) as Promise<typeof mongoose>;
  }

  cached.conn = await (cached.promise as unknown) as Connection;
  return cached.conn;
}

mongoose.connection.on("connected", () => {
  console.log("Mongoose está conectado");
});

mongoose.connection.on("error", (err) => {
  console.log("Error en la conexión de Mongoose: " + err);
});