import { model, Schema } from "mongoose";
import Usuario from "../model/Usuario";
import Rol from "../model/Rol";

const usuarioSchema = new Schema<Usuario>({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contrasenia: { type: String, required: false },
   rol: { type: String, enum: Object.values(Rol), default: Rol.USUARIO, required: true},
   firebaseUid: { type: String,  unique: true},
  },
  { versionKey: false }
);

 export const UsuarioModel = model<Usuario>('Usuario', usuarioSchema); 


 