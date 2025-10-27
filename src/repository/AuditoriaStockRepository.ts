import { AuditoriaStockModel } from "../schema/AuditoriaStockSchema";
import AuditoriaStockDTO from "../model/DTO/AuditoriaStockDto";
import { mapDtoToEntity, mapEntityToDto } from "../mappers/AuditoriaStockMapper";

const findAll = async () => {
  const docs = await AuditoriaStockModel.find().populate("id_usuario")
  return docs.map(mapEntityToDto);
};

const create = async (dto: AuditoriaStockDTO) => {
  const entity = mapDtoToEntity(dto);
  const created = await AuditoriaStockModel.create(entity);
  return mapEntityToDto(created);
};

const findByStock = async (id_stock: string) => {
  const docs = await AuditoriaStockModel.find({ id_stock }).populate("id_usuario").populate("id_stock");
  return docs.map(mapEntityToDto);
};

const findById = async (id: string) => {
  const doc = await AuditoriaStockModel.findById(id).populate("id_usuario");
  return doc ? mapEntityToDto(doc) : null;
};

export default {create,findAll,findByStock,findById,};
