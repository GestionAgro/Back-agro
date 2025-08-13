import { model, Schema } from "mongoose";
import Persona from "../model/Persona";

const personaSchema = new Schema<Persona>({
  nombre: { type: String, required: true },
  tipo_persona: { type: String, required: true }
}, { timestamps: true });

export const PersonaModel = model<Persona>('Persona', personaSchema);