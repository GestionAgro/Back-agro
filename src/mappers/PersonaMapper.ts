import { Types } from "mongoose";
import PersonaDTO from "../model/DTO/PersonaDto";
import Persona from "../model/Persona";


export const mapDtoToEntity = (dto: PersonaDTO): Persona =>({
   ...dto,
   _id: dto._id ? new Types.ObjectId(dto._id) : undefined,
});


export const mapEntityToDto = (persona: any): PersonaDTO => {
const plano = typeof persona?.toObject === "function" ? persona.toObject() : persona;
return {
  ...plano,
  _id: plano._id?.toString(),
  };
};