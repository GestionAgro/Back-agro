import { AuditoriaRemitoModel } from "../schema/AuditoriaRemitoSchema";
import AuditoriaRemitoDTO from "../model/DTO/AuditoriaRemitoDto";
import { mapDtoToEntity, mapEntityToDto } from "../mappers/AuditoriaRemitoMapper";

const findAll = async () => {
  const docs = await AuditoriaRemitoModel.find().populate("id_usuario").populate("id_remito");
  return docs.map(mapEntityToDto);
};

const create = async (dto: AuditoriaRemitoDTO) => {
  const entity = mapDtoToEntity(dto);
  const created = await AuditoriaRemitoModel.create(entity);
  return mapEntityToDto(created);
};

const findByRemito = async (id_remito: string) => {
  const docs = await AuditoriaRemitoModel.find({ id_remito }).populate("id_usuario").populate("id_remito");
  return docs.map(mapEntityToDto);
};

const findById = async (id: string) => {
  const doc = await AuditoriaRemitoModel.findById(id).populate("id_usuario");
  return doc ? mapEntityToDto(doc) : null;
};

export default {create,findAll,findByRemito,findById,};
