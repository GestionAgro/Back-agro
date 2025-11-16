import { ProductoModel } from "../schema/ProductoSchema";
import Producto from "../model/Producto";
import { mapDtoToEntity, mapEntityToDto } from "../mappers/ProductoMapper";
import ProductoDTO from "../model/DTO/ProductoDto";

const findall = async () => { 
 const docs = await ProductoModel.find();
 return docs.map(mapEntityToDto);
};

const findById = async (id: string) => {
  const doc = await ProductoModel.findById(id);
  return doc ? mapEntityToDto(doc) : null;
};

const create = async (dto: ProductoDTO) => {
  const entity = mapDtoToEntity(dto);
  const created = await ProductoModel.create(entity)
  return mapEntityToDto(created);
};

const update = async (id: string, dto: Partial<ProductoDTO>) => {
  const entity = mapDtoToEntity(dto as ProductoDTO);
  const updated = await ProductoModel.findByIdAndUpdate(id, entity, { new: true });
  return updated ? mapEntityToDto(updated) : null;
};

const remove = async (id: string) => {
  const deleted =  await ProductoModel.findByIdAndDelete(id);
  return deleted ? mapEntityToDto(deleted) : null;
};

const findByName = async (nombre: string) => {
  return await ProductoModel.findOne({nombre_producto: nombre});
}

export default { findall, findById, create, update, remove, findByName};
