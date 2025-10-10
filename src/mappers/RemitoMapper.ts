import { Types } from "mongoose";
import RemitoDto from "../model/DTO/RemitoDto";
import Remito from "../model/Remito";

export const mapDtoToEntity = (dto: RemitoDto): Remito => ({
  ...dto,
  _id: new Types.ObjectId(dto._id ?? undefined),
  recibido_por: new Types.ObjectId(
    typeof dto.recibido_por === "string" ? dto.recibido_por : dto.recibido_por._id
  ),
  productos: dto.productos?.map(p => ({
    ...p,
    id_producto: new Types.ObjectId(p.id_producto),
  }))
});


export const mapEntityToDto = (remito: any): RemitoDto => {
  const recibido = remito.recibido_por;

  return {
    _id: remito._id?.toString(),
    numero_remito: remito.numero_remito,
    fecha: remito.fecha,
    empresa: remito.empresa,
    estado: remito.estado,
    productos: remito.productos.map((p: any) => ({
      id_producto: p.id_producto?.toString(),
      nombre_producto: p.nombre_producto,
      cantidad: p.cantidad,
    })),
    recibido_por:
      typeof recibido === "object" && recibido._id
        ? {
            _id: recibido._id.toString(),
            nombre: recibido.nombre,
          }
        : recibido?.toString(),
  };
};
 
