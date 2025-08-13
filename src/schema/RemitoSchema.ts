import { model, Schema, Types } from "mongoose";
import Remito from "../model/Remito";

const remitoSchema = new Schema({
  numero_remito: { type: String, required: true },
  fecha: { type: Date, required: true },
  empresa: { type: String, required: true },
  detalle: { type: String, required: true },
  recibido_por: { type: Schema.Types.ObjectId, ref: 'Persona', required: true },
  estado: { type: String, required: true }
},{ versionKey: false });

export const RemitoModel = model<Remito>('Remito', remitoSchema);