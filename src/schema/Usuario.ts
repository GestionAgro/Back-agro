import { model, Schema } from "mongoose";

const usuarioSchema = new Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    contrasena: {type:String, required:true},
    rol: { type: String, enum: ['admin', 'usuario'], default: 'usuario' }},
    {timestamps: true});

 export const Usuario = model('Usuario', usuarioSchema); 