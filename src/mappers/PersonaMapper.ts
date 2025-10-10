import { Types } from "mongoose";
import PersonaDTO from "../model/DTO/PersonaDto";
import Persona from "../model/Persona";


export const mapDtoToEntity = (dto: PersonaDTO): Persona =>{
    if (!dto) return null as any;
    return{
   ...dto,
   _id: dto._id ? new Types.ObjectId(dto._id) : undefined,
};
};

export const mapEntityToDto = (persona: any): PersonaDTO => ({
  _id: persona._id?.toString(),
  nombre: persona.nombre,
  tipo_persona: persona.tipo_persona,
});