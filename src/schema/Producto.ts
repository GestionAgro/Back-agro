import { model, Schema } from "mongoose";

const productoSchema = new Schema({
    nombre_producto: {type: String, required: true, unique: true},
    cantidad_actual: {type: Number, required:true},
},{timestamps: true});

 export const Producto = model('Producto', productoSchema); 