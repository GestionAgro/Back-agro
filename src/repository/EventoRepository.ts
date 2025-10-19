import { EventoModel } from "../schema/EventoSchema"
import { mapDtoToEntity, mapEntityToDto } from "../mappers/EventoMapper"
import EventoDTO from "../model/DTO/EventoDto";


const findAll = async () => {
  const docs = await EventoModel.find().populate("id_persona");
  return docs.map(mapEntityToDto);
};

const findById = async (id: string) => {
  const doc = await EventoModel.findById(id).populate("id_persona");
  return doc ? mapEntityToDto(doc) : null;
};
 
const create = async (dto: EventoDTO) => {
  const entity = mapDtoToEntity(dto);
  const created = await EventoModel.create(entity);
  return mapEntityToDto(created);
};

const remove = async (id: string) => {
  const deleted = await EventoModel.findByIdAndDelete(id);
  return deleted ? mapEntityToDto(deleted) : null;
};

export default { findAll, findById, create, remove };