import { Schema, model } from 'mongoose';
import { ProductoRemito } from '../model/ProductoRemito';


const productoRemitoSchema = new Schema({
  id_remito: { type: Schema.Types.ObjectId, ref: 'Remito', required: true },
  id_producto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true }
}, { versionKey: false });

export const ProductoRemitoModel = model<ProductoRemito>('ProductoRemito', productoRemitoSchema);