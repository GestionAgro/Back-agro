import { Types } from "mongoose";

interface Producto {
_id?: Types.ObjectId;
cantidad_actual:number;
nombre_producto:string;
unidad?: string;
}
export default Producto