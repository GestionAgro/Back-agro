import { Types } from "mongoose";
import FacturaDto from "../model/DTO/FacturaDto";
import Factura from "../model/Factura";

export const mapDtoToEntity = (dto: FacturaDto): Factura => ({
  ...dto,
  _id: new Types.ObjectId(dto._id ?? undefined),
  recibido_por: new Types.ObjectId(
    typeof dto.recibido_por === "string" ? dto.recibido_por : dto.recibido_por._id
  ),
});

export const mapEntityToDto = (factura: any): FacturaDto => {
  const recibido = factura.recibido_por;

  return {
    ...factura,
    _id: factura._id?.toString(),
    recibido_por:
      typeof recibido === "object" && recibido._id
        ? { ...recibido, _id: recibido._id.toString() }
        : recibido?.toString(),
  };
};

