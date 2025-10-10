import { model, Schema, Types } from "mongoose";
import Remito, { EstadoRemito,ProductoDetalleRemito } from "../model/Remito";
import ProductoRemito from "../model/ProductoRemito";

const productoDetalleSchema = new Schema<ProductoDetalleRemito>({
  id_producto: { type: Schema.Types.ObjectId, ref: "Producto", required: true },
  nombre_producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
});


const remitoSchema = new Schema<Remito>({
  numero_remito: { type: Number, required: true },
  fecha: { type: Date, required: true },
  empresa: { type: String, required: true },
  productos: [productoDetalleSchema],
  recibido_por: { type: Schema.Types.ObjectId, ref: "Persona", required: true },
  estado: { type: String, enum:Object.values(EstadoRemito), require: true, default: EstadoRemito.EN_ESPERA, },
}, { versionKey: false });

export const RemitoModel = model<Remito>("Remito", remitoSchema);
