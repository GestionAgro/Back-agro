import { model, Schema } from "mongoose";
import Producto from "../model/Producto";

const productoSchema = new Schema<Producto>({
  cantidad_actual: { type: Number, required: true },
  nombre_producto: { type: String, required: true, unique: true }
}, { versionKey: false });

export const ProductoModel = model<Producto>('Producto', productoSchema);