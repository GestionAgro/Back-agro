import { RemitoModel } from "../schema/RemitoSchema";
import Remito from "../model/Remito";
import { populate } from "dotenv";

const findall = async () => {
    return await RemitoModel.find().populate("recibido_por");
};

const findById = async (id: string) => {
    return await RemitoModel.findById(id).populate("recibido_por");
}; 

const create = async (remito : Remito) => {
    return await RemitoModel.create(remito);
};

const update = async (id: string, remito: Partial<Remito>) => {
  return await RemitoModel.findOneAndUpdate({ _id: id }, remito, { new: true });
};

const remove = async (id: string) => {
  return await RemitoModel.findOneAndDelete({ _id: id });
};


const findByNumero = async (numero: number) => {
    return await RemitoModel.findOne({numero_remito: numero}).populate("recibido_por");
};

const updateByNumero = async (numero_remito: number, data: Partial<Remito>) => {
  return await RemitoModel.findOneAndUpdate({ numero_remito }, data, { new: true });
};


export default {findall, findById, create, update, remove, findByNumero,updateByNumero};