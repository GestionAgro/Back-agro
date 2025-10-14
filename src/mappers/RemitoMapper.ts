import { Types } from "mongoose";
import RemitoDto from "../model/DTO/RemitoDto";
import Remito, { ProductoDetalleRemito } from "../model/Remito";

export const mapDtoToEntity = (dto: RemitoDto): Remito => ({
  ...dto,
  _id: dto._id ? new Types.ObjectId(dto._id) : undefined,
  recibido_por: new Types.ObjectId(
    typeof dto.recibido_por === "string" ? dto.recibido_por : dto.recibido_por._id
  ),
  productos: dto.productos?.map(p => ({
    ...p,
    id_producto: new Types.ObjectId(p.id_producto),
  }))
});


export const mapEntityToDto = (remito: any): RemitoDto => {
  const plano = typeof remito?.toObject === "function" ? remito.toObject() : remito;
  const recibido = plano.recibido_por;

  return {
    ...plano,
    _id: plano._id?.toString(),
    productos: plano.productos.map((p: ProductoDetalleRemito) => ({
      ...p,
      id_producto: p.id_producto?.toString(),
    })),
    recibido_por:
      typeof recibido === "object" && recibido._id
        ? {...recibido, _id: recibido._id.toString()}
        : recibido?.toString(),
  };
};
 
