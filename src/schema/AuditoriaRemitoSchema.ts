import { Schema, model, Types } from 'mongoose';
import AuditoriaRemito from '../model/AuditoriaRemito';

const auditoriaRemitoSchema = new Schema({
  id_remito: { type: Schema.Types.ObjectId, ref: 'Remito', required: true },
  id_usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  campo_modificado: { type: String, required: true },
  valor_anterior: { type: String, required: true },
  valor_nuevo: { type: String, required: true },
  fecha_y_hora: { type: Date, default: Date.now },
  descripcion: { type: String, required: true }
}, { versionKey: false });

export const AuditoriaRemitoModel = model<AuditoriaRemito>('AuditoriaRemito', auditoriaRemitoSchema);