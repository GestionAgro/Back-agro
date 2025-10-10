import { Types } from "mongoose";
import UsuarioDTO from "../model/DTO/UsuarioDto";
import Usuario from "../model/Usuario";


export const mapDtoToEntity = (dto: UsuarioDTO): Usuario => {
  if (!dto) return null as any;
    return {
    ...dto,
    _id: dto._id ? new Types.ObjectId(dto._id) : undefined,
   
  };
};

export const mapEntityToDto = (usuario: any): UsuarioDTO => {
  return {
    _id: usuario._id?.toString(),
    nombre: usuario.nombre,
    email: usuario.email,
    contrasenia: usuario.contrasenia,
    rol: usuario.rol,
  };
};