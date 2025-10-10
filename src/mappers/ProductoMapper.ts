import { Types } from "mongoose";
import ProductoDTO from "../model/DTO/ProductoDto";
import Producto from "../model/Producto";


export const mapDtoToEntity = (dto: ProductoDTO): Producto =>{
    if (!dto) return null as any;
    return{
   ...dto,
   _id: dto._id ? new Types.ObjectId(dto._id) : undefined,
};
};


export const mapEntityToDto = (producto: any): ProductoDTO => ({
_id: producto._id?.toString(),
nombre_producto: producto.nombre_producto,
cantidad_actual: producto.cantidad_actual,
  });

