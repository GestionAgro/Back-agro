import { RemitoModel } from "../schema/RemitoSchema";
import Remito from "../model/Remito";

const findall = async () => {
    return await RemitoModel.find();
};

const findById = async (id: string) => {
    return await RemitoModel.findById(id);
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
    return await RemitoModel.findOne({numero_remito: numero})
};



export default {findall, findById, create, update, remove, findByNumero};