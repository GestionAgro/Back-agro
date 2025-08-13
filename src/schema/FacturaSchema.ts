import { Schema, model, Types } from 'mongoose';
import Factura from '../model/Factura';

const facturaSchema = new Schema({
  numero_factura: { type: String, required: true },
  empresa: { type: String, required: true },
  importe: { type: Number, required: true },
  estado: { type: String, required: true },
  id_remito: { type: Schema.Types.ObjectId, ref: 'Remito', unique: true, required: true },
  recibido_por: { type: Schema.Types.ObjectId, ref: 'Persona', required: true }
}, { versionKey: false });

export const FacturaModel = model<Factura>('Factura', facturaSchema);