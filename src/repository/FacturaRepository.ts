import { ObjectId, Types } from "mongoose";
import Factura from "../model/Factura";
import { FacturaModel } from "../schema/FacturaSchema";

const findall = async () => {
    return await FacturaModel.find().populate("recibido_por");
};
 
const findById = async (id: string) => {
    return await FacturaModel.findById(id).populate("recibido_por");
};

const create = async (factura : Factura) => {
    return await FacturaModel.create(factura);
};

const update = async (id: string, factura: Partial<Factura>) =>{
  return await FacturaModel.findOneAndUpdate({ _id: id }, factura, { new: true });
};

const remove = async (id: string) => {
  return await FacturaModel.findOneAndDelete({ _id: id });
};


const findByNumero = async (numero_factura: number) => {
    return await FacturaModel.findOne({numero_factura}).populate("recibido_por");
};
const findByRemito = async (numero_remito: number) => {
  return await FacturaModel.findOne({ numero_remito }).populate("recibido_por");
};



export default {findall, findById, create, update, remove, findByNumero,findByRemito};