import { Types } from "mongoose";
import AuditoriaFactura from "../model/AuditoriaFactura";
import AuditoriaFacturaDTO from "../model/DTO/AuditoriaFacturaDto";


export const mapDtoToEntity = (dto: AuditoriaFacturaDTO): AuditoriaFactura => ({
  ...dto,
  _id: dto._id ? new Types.ObjectId(dto._id) : undefined,
  id_factura: new Types.ObjectId(dto.id_factura),
  id_usuario: new Types.ObjectId(dto.id_usuario),
  fecha_y_hora: dto.fecha_y_hora ? new Date(dto.fecha_y_hora) : new Date(),
});

export const mapEntityToDto = (auditoria: any): AuditoriaFacturaDTO => {
  const plano = typeof auditoria?.toObject === "function" ? auditoria.toObject() : auditoria;
  const factura = plano.id_factura;
  const usuario = plano.id_usuario;

  return {
    ...plano,
    _id: plano._id?.toString(),
    id_factura:
      typeof factura === "object" && factura?._id
        ? factura._id.toString()
        : factura?.toString(),
    id_usuario:
      typeof usuario === "object" && usuario?._id
        ? usuario._id.toString()
        : usuario?.toString(),
  };
};
