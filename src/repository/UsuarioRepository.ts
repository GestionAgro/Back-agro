import Usuario from "../model/Usuario";
import { RemitoModel } from "../schema/RemitoSchema";
import { UsuarioModel } from "../schema/UsuarioSchema";
import UsuarioDTO from "../model/DTO/UsuarioDto";
import { mapDtoToEntity, mapEntityToDto } from "../mappers/UsuarioMapper";
import Persona from "../model/Persona";

const findAll = async() => {
const docs = await UsuarioModel.find();
return docs.map(mapEntityToDto);
};

const findById = async (id:string) => {
  const doc = await UsuarioModel.findById(id);
  return doc ? mapEntityToDto(doc): null;
};

const create = async (dto: UsuarioDTO) => {
  const entity = mapDtoToEntity(dto);
  const created = await UsuarioModel.create(entity);
  return mapEntityToDto(created);
};

const update = async (id: string, dto: Partial<UsuarioDTO>) => {
  const entity = mapDtoToEntity(dto as UsuarioDTO);
  const updated = await UsuarioModel.findByIdAndUpdate(id, entity, {new: true})
  return updated ? mapEntityToDto(updated) : null;  
};

const remove = async( id: string) => {
   const deleted = await UsuarioModel.findByIdAndDelete(id)
   return deleted ? mapEntityToDto(deleted) : null;
};

const findByEmail = async (email: string) => {
  const doc = await UsuarioModel.findOne({ email });
  return doc ? mapEntityToDto(doc) : null;
};

const findByFirebaseUid = async (firebaseUid: string) => {
  const doc = await UsuarioModel.findOne({ firebaseUid }); 
  return doc ? mapEntityToDto(doc) : null; 
};

export default{findAll,findById,create,update,remove,findByEmail,findByFirebaseUid};
