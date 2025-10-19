import { Types } from "mongoose";
import Rol from "./Rol";

interface Usuario {
    _id?: Types.ObjectId;
    nombre: string;
    email: string;
    contrasenia: string;
    rol: Rol;
    firebaseUid?: string;
}

export default Usuario;