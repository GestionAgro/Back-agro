import { Schema, model, Types } from 'mongoose';

const facturaSchema = new Schema({
  numero_factura: { type: String, required: true },
  empresa: { type: String, required: true },
  importe: { type: Number, required: true },
  estado: { type: String, default: 'pendiente' },
  id_remito: { type: Types.ObjectId, ref: 'Remito', unique: true },
  recibido_por: { type: Types.ObjectId, ref: 'Persona', required: true }
}, { timestamps: true });

export const Factura = model('Factura', facturaSchema);