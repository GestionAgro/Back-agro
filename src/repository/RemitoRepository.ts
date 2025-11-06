import { RemitoModel } from "../schema/RemitoSchema";
import Remito from "../model/Remito";
import { populate } from "dotenv";
import { mapDtoToEntity, mapEntityToDto } from "../mappers/RemitoMapper"
import RemitoDto from "../model/DTO/RemitoDto";


const findall = async () => {
  const docs = await RemitoModel.find().populate("recibido_por");
  return docs.map(mapEntityToDto);
};

const findById = async (id: string) => {
  const doc = await RemitoModel.findById(id).populate("recibido_por");
  return doc ? mapEntityToDto(doc) : null;
};

const create = async (remitodto: RemitoDto) => {
  const entity = mapDtoToEntity(remitodto);
  const created = await RemitoModel.create(entity);
  return mapEntityToDto(created);
};

const update = async (id: string, dto: Partial<RemitoDto>): Promise<RemitoDto | null> => {
  const updated = await RemitoModel.findOneAndUpdate({_id: id }, dto, { new: true }).populate("recibido_por");
  return updated ? mapEntityToDto(updated) : null;
};

const remove = async (id: string) => {
  const deleted = await RemitoModel.findOneAndDelete({ _id: id }).populate("recibido_por");
  return deleted ? mapEntityToDto(deleted) : null;
};


const findByNumero = async (numero: number) => {
  const doc = await RemitoModel.findOne({ numero_remito: numero }).populate("recibido_por");
  return doc ? mapEntityToDto(doc) : null;
};

const updateByNumero = async (numero_remito: number, dto: Partial<RemitoDto>) => {
  const updated = await RemitoModel.findOneAndUpdate({ numero_remito }, dto,{ new: true }).populate("recibido_por");
  return updated ? mapEntityToDto(updated) : null;
};

const reporteMensualRemitos = async () => {
  const resultado = await RemitoModel.aggregate([
    {
      $group: {
        _id: {$month: "$fecha"},
        totalRemitos: {$sum:1},
      },
    },
    {$sort: {"_id": 1}},
  ]);

  return resultado.map((item)=> ({
    mes: item._id,
    totalRemitos: item.totalRemitos,
  }))
}


export default {findall, findById, create, update, remove, findByNumero,updateByNumero, reporteMensualRemitos};

