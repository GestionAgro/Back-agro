import { Schema, model } from 'mongoose';
import AuditoriaStock from '../model/AuditoriaStock';

const auditoriaStockSchema = new Schema({
  id_stock: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
  id_usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  campo_modificado: { type: String, required: true },
  valor_anterior: { type: String, required: true },
  valor_nuevo: { type: String, required: true },
  fecha_y_hora: { type: Date, default: Date.now },
  descripcion: { type: String, required: true }
}, { versionKey: false });

export const AuditoriaStockModel = model<AuditoriaStock>('AuditoriaStock', auditoriaStockSchema);
