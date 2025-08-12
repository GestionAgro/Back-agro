import { Schema, model, Types } from 'mongoose';

const eventoSchema = new Schema({
  persona: { type: Types.ObjectId, ref: 'Persona', required: true },
  fecha_y_hora: { type: Date, default: Date.now },
  tipo_operacion: { type: String, required: true },
  entidad_afectada: { type: String, required: true },
  entidad_id: { type: Types.ObjectId },
  descripcion: { type: String }
}, { timestamps: true });

export const Evento = model('Evento', eventoSchema);
