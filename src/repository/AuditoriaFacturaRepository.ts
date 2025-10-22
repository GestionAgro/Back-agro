import { AuditoriaFacturaModel } from "../schema/AuditoriaFacturaSchema";
import AuditoriaFacturaDTO from "../model/DTO/AuditoriaFacturaDto";
import { mapDtoToEntity,mapEntityToDto } from "../mappers/AuditoriaFacturaMapper";


const findAll = async () => {
  const docs = await AuditoriaFacturaModel.find().populate("id_usuario").populate("id_factura");
  return docs.map(mapEntityToDto);
};

const create = async (dto: AuditoriaFacturaDTO) => {
  const entity = mapDtoToEntity(dto);
  const created = await AuditoriaFacturaModel.create(entity);
  return mapEntityToDto(created);
};

const findByFactura = async (id_factura: string) => {
  const docs = await AuditoriaFacturaModel.find({ id_factura }).populate("id_usuario").populate("id_factura");
  return docs.map(mapEntityToDto);
};

const findById = async (id: string) => {
  const doc = await AuditoriaFacturaModel.findById(id).populate("id_usuario");
  return doc ? mapEntityToDto(doc) : null;
};

export default {create, findAll,findByFactura, findById};