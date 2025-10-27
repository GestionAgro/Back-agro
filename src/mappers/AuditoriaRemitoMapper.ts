import { Types } from "mongoose";
import AuditoriaRemito from "../model/AuditoriaRemito";
import AuditoriaRemitoDTO from "../model/DTO/AuditoriaRemitoDto";

export const mapDtoToEntity = (dto: AuditoriaRemitoDTO): AuditoriaRemito => ({
  ...dto,
  _id: dto._id ? new Types.ObjectId(dto._id) : undefined,
  id_remito: new Types.ObjectId(dto.id_remito),
  id_usuario: new Types.ObjectId(dto.id_usuario),
  fecha_y_hora: dto.fecha_y_hora ? new Date(dto.fecha_y_hora) : new Date(),
});

export const mapEntityToDto = (auditoria: any): AuditoriaRemitoDTO => {
  const plano = typeof auditoria?.toObject === "function" ? auditoria.toObject() : auditoria;
  const remito = plano.id_remito;
  const usuario = plano.id_usuario;

  return {
    ...plano,
    _id: plano._id?.toString(),
    id_remito:
      typeof remito === "object" && remito?._id
        ? remito._id.toString()
        : remito?.toString(),
    id_usuario:
      typeof usuario === "object" && usuario?._id
        ? usuario._id.toString()
        : usuario?.toString(),
  };
};
