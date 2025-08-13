import { Schema, model, Types } from 'mongoose';
import Evento from '../model/Evento';

const eventoSchema = new Schema({
  id_persona: { type: Schema.Types.ObjectId, ref: 'Persona', required: true },
  fecha_y_hora: { type: Date, default: Date.now },
  tipo_operacion: { type: String, required: true },
  entidad_afectada: { type: String, required: true },
  entidad_id: { type: String, required: true },
  descripcion: { type: String, required: true }
}, { versionKey: false });


export const EventoModel = model<Evento>('Evento', eventoSchema);
