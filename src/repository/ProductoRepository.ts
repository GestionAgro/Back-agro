import { ProductoModel } from "../schema/ProductoSchema";
import Producto from "../model/Producto";

const findall = async () => { 
  return await ProductoModel.find();
};

const findById = async (id: string) => {
  return await ProductoModel.findById(id);
};

const create = async (producto: Producto) => {
  return await ProductoModel.create(producto);
};

const update = async (id: string, data: Partial<Producto>) => {
  return await ProductoModel.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id: string) => {
  return await ProductoModel.findByIdAndDelete(id);
};

export default { findall, findById, create, update, remove };
