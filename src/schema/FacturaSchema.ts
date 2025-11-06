import { Schema, model, Types } from 'mongoose';
import Factura, {EstadoFactura,TipoFactura}from '../model/Factura';

const facturaSchema = new Schema<Factura>({
  numero_factura: { type: Number, required: true },
  tipo_factura: { type: String,enum: Object.values(TipoFactura), required: true,},
  empresa: { type: String, required: true },
  fecha: { type: Date, required: true },
  importe: { type: Number, required: true },
  estado: {type: String, enum: Object.values(EstadoFactura),required: true,},
  numero_remito:{ type: Number, required: false },
  recibido_por: { type: Schema.Types.ObjectId, ref: "Persona", required: true },
  id_usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true }
}, { versionKey: false });

export const FacturaModel = model<Factura>('Factura', facturaSchema);

  

