import { Types } from "mongoose";
import AuditoriaStock from "../model/AuditoriaStock";
import AuditoriaStockDTO from "../model/DTO/AuditoriaStockDto";

export const mapDtoToEntity = (dto: AuditoriaStockDTO): AuditoriaStock => ({
  ...dto,
  _id: dto._id ? new Types.ObjectId(dto._id) : undefined,
  id_stock: new Types.ObjectId(dto.id_stock),
  id_usuario: new Types.ObjectId(dto.id_usuario),
  fecha_y_hora: dto.fecha_y_hora ? new Date(dto.fecha_y_hora) : new Date(),
});

export const mapEntityToDto = (auditoria: any): AuditoriaStockDTO => {
  const plano = typeof auditoria?.toObject === "function" ? auditoria.toObject() : auditoria;
  const stock = plano.id_stock;
  const usuario = plano.id_usuario;

  return {
    ...plano,
    _id: plano._id?.toString(),
    id_stock:
      typeof stock === "object" && stock?._id
        ? stock._id.toString()
        : stock?.toString(),
    id_usuario:
      typeof usuario === "object" && usuario?._id
        ? usuario._id.toString()
        : usuario?.toString(),
  };
};
