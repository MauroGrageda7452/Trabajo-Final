import { connectDB } from "@/app/libs/gamedb";
import Usuarios from "@/app/models/usuarios";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { updateSave , fetchSave} from "@/app/services/partida-seleccionada";
import Partidas from "@/app/models/partidas";

export async function POST(request: Request) {
    const { username, password} = await request.json(); // Obtener los datos de usuario y contraseña del cuerpo de la solicitud
    await connectDB();

    // Buscar el usuario en la base de datos por el nombre de usuario
    const usuario = await Usuarios.findOne({ username});
    //console.log(usuario)
    // const {idPlayer} = await Usuarios.findOne({id});

    //console.log(usuario);
    if (!usuario) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Comparar la contraseña hasheada almacenada con la contraseña proporcionada por el usuario
    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
        return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }
    // fetchSave(usuario.id);
    // const partida = await Partidas.findOne({ id: usuario.id });
    // console.log(partida)
    // if (!partida){
    //     return NextResponse.json({ error: 'Partida incorrecta' }, { status: 404 });
 
    // }
    // updateSave(partida);
    // // Si la contraseña es válida, retornar el usuario
    return NextResponse.json({ userId: usuario.id, message: "Login successful" });


}
