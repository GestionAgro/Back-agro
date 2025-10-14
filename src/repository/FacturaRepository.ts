import { ObjectId, Types } from "mongoose";
import Factura from "../model/Factura";
import { FacturaModel } from "../schema/FacturaSchema";
import { mapDtoToEntity, mapEntityToDto } from "../mappers/FacturaMapper";
import FacturaDto from "../model/DTO/FacturaDto";

const findall = async () => {
    const docs = await FacturaModel.find().populate("recibido_por");
    return docs.map(mapEntityToDto);
};
 
const findById = async (id: string) => {
    const doc = await FacturaModel.findById(id).populate("recibido_por");
    return doc ? mapEntityToDto(doc) : null;
};

const create = async (dto: FacturaDto): Promise<FacturaDto> => {
  const entity = mapDtoToEntity(dto);
  const created = await FacturaModel.create(entity);
  return mapEntityToDto(created);
};

const update = async (id: string, dto: Partial<FacturaDto>): Promise<FacturaDto | null> => {
  const updated = await FacturaModel.findOneAndUpdate({ _id: id }, dto, { new: true }).populate("recibido_por");
  return updated ? mapEntityToDto(updated) : null;
};


const remove = async (id: string): Promise<FacturaDto | null> => {
  const deleted = await FacturaModel.findOneAndDelete({ _id: id });
  return deleted ? mapEntityToDto(deleted) : null;
};

const findByNumero = async (numero_factura: number): Promise<FacturaDto | null> => {
  const doc = await FacturaModel.findOne({ numero_factura }).populate("recibido_por");
  return doc ? mapEntityToDto(doc) : null;
};

const findByRemito = async (numero_remito: number): Promise<FacturaDto | null> => {
  const doc = await FacturaModel.findOne({ numero_remito }).populate("recibido_por");
  return doc ? mapEntityToDto(doc) : null;
};




export default {findall, findById, create, update, remove, findByNumero,findByRemito};