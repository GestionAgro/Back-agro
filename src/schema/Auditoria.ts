import { Schema, model, Types } from 'mongoose';

const auditoriaSchema = new Schema({
  tipo: { type: String, enum: ['remito', 'factura', 'stock'], required: true },
  referencia: { type: Types.ObjectId, required: true },
  usuario: { type: Types.ObjectId, ref: 'Usuario', required: true },
  campo_modificado: { type: String, required: true },
  valor_anterior: { type: String },
  valor_nuevo: { type: String },
  descripcion: { type: String },
  fecha_y_hora: { type: Date, default: Date.now }
}, { timestamps: true });

export const Auditoria = model('Auditoria', auditoriaSchema);
