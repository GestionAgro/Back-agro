import { model, Schema } from "mongoose";
import Usuario from "../model/Usuario";

const usuarioSchema = new Schema<Usuario>({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contrasenia: { type: String, required: true },
    rol: { type: String, required: true }
  },
  { versionKey: false }
);

 export const UsuarioModel = model<Usuario>('Usuario', usuarioSchema); 