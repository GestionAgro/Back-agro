import { model, Schema } from "mongoose";
import Persona, { TipoPersona } from "../model/Persona";

const personaSchema = new Schema<Persona>({
  nombre: { type: String, required: true },
  tipo_persona: { type: String, enum: Object.values(TipoPersona), required:true }
}, { versionKey: false });

export const PersonaModel = model<Persona>('Persona', personaSchema);