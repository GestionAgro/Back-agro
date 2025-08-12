import { model, Schema } from "mongoose";

const personaSchema = new Schema({
    nombre: {type: String, required: true},
    tipo_persona: {type: String, required:true}},
    {timestamps: true});

 export const Persona = model('Persona', personaSchema); 