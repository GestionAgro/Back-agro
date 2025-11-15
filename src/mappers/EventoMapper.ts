import { Types } from "mongoose";
import EventoDto from "../model/DTO/EventoDto";
import Evento from "../model/Evento";

export const mapDtoToEntity = (dto: EventoDto): Evento => ({
  ...dto,
  _id: dto._id ? new Types.ObjectId(dto._id) : undefined,
  id_persona: new Types.ObjectId(dto.id_persona),
  id_entidad: new Types.ObjectId(dto.id_entidad),
  fechaYhora: dto.fechaYhora ? new Date(dto.fechaYhora) : new Date(),
});


export const mapEntityToDto = (evento: any): EventoDto => {
  const plano = typeof evento?.toObject === "function" ? evento.toObject() : evento;
  const persona = plano.id_persona;

  return {
    ...plano,
    _id: plano._id?.toString(),
    id_entidad: plano.id_entidad?.toString(),
    id_persona:
      typeof persona === "object" && persona._id
        ?  persona._id.toString() 
        : persona?.toString(),
    nombre:
      persona && typeof persona === "object" && persona.nombre
        ? persona.nombre
        : "",
  };
};
    
  
