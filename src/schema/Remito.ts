import { model, Schema, Types } from "mongoose";

const remitoSchema = new Schema({
    numero_remito: {type: String, required: true},
    fecha: {type: Date, required : true},
    empresa: { type: String, required: true },
    detalle: { type: String },
    recibido_por: { type: Types.ObjectId, ref: 'Persona', required: true },
    estado: { type: String, enum: ['pendiente', 'archivado'], default: 'pendiente' },
    productos: [{
    producto: { type: Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true }
  }]
}, { timestamps: true });

 export const Remito = model('Remito', remitoSchema); 