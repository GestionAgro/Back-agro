import { Types } from "mongoose";
import AuditoriaFactura from "../model/AuditoriaFactura";
import AuditoriaFacturaDTO from "../model/DTO/AuditoriaFacturaDto";


export const mapDtoToEntity = (dto: AuditoriaFacturaDTO): AuditoriaFactura => ({
  _id: dto._id ? new Types.ObjectId(dto._id) : undefined,
  id_factura: new Types.ObjectId(dto.id_factura),
  id_usuario: new Types.ObjectId(dto.id_usuario),
  campo_modificado: dto.campo_modificado,
  valor_anterior: dto.valor_anterior,
  valor_nuevo: dto.valor_nuevo,
  fecha_y_hora: dto.fecha_y_hora ? new Date(dto.fecha_y_hora) : new Date(),
  descripcion: dto.descripcion,
});

export const mapEntityToDto = (auditoria: any): AuditoriaFacturaDTO => {
  const plano = typeof auditoria?.toObject === "function" ? auditoria.toObject() : auditoria;

  return {
    _id: plano._id?.toString(),
    id_factura: plano.id_factura?._id?.toString() ?? plano.id_factura?.toString(),
    id_usuario: plano.id_usuario?._id?.toString() ?? plano.id_usuario?.toString(),
    campo_modificado: plano.campo_modificado,
    valor_anterior: plano.valor_anterior,
    valor_nuevo: plano.valor_nuevo,
    fecha_y_hora: plano.fecha_y_hora,
    descripcion: plano.descripcion,
  };
};
