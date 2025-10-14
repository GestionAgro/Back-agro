import { Types } from "mongoose";
import ProductoDTO from "../model/DTO/ProductoDto";
import Producto from "../model/Producto";


export const mapDtoToEntity = (dto: ProductoDTO): Producto =>({
   ...dto,
   _id: dto._id ? new Types.ObjectId(dto._id) : undefined,
});


export const mapEntityToDto = (producto: any): ProductoDTO => {
const plano = typeof producto?.toObject === "function" ? producto.toObject() : producto;
 return {
   ...plano,
   _id: plano._id?.toString(),
 }
};

