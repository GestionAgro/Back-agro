import { model, Schema } from "mongoose";
import Remito, { EstadoRemito } from "../model/Remito";

const remitoSchema = new Schema({
  numero_remito: { type: Number, required: true },
  fecha: { type: Date, required: true },
  empresa: { type: String, required: true },
  detalle: { type: String, required: true },
  recibido_por: { type: String, required: true },
  estado: { type: String, enum:Object.values(EstadoRemito), require: true, default: EstadoRemito.EN_ESPERA, },
}, { versionKey: false });

export const RemitoModel = model<Remito>("Remito", remitoSchema);
