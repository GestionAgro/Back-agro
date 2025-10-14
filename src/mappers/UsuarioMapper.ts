import { Types } from "mongoose";
import UsuarioDTO from "../model/DTO/UsuarioDto";
import Usuario from "../model/Usuario";


export const mapDtoToEntity = (dto: UsuarioDTO): Usuario => ({
    ...dto,
    _id: dto._id ? new Types.ObjectId(dto._id) : undefined,
   
  });


export const mapEntityToDto = (usuario: any): UsuarioDTO => {
  const plano = typeof usuario?.toObject === "function" ? usuario.toObject() : usuario;
  return {
    ...plano,
    _id: plano._id?.toString(),
  };
};