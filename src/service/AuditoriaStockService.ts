import AuditoriaStockRepository from "../repository/AuditoriaStockRepository";
import AuditoriaStockDTO from "../model/DTO/AuditoriaStockDto";

const registrarAuditoria = async (dto: AuditoriaStockDTO) => {
  return await AuditoriaStockRepository.create(dto);
};

const listarAuditorias = async () => {
  return await AuditoriaStockRepository.findAll();
};

const obtenerPorStock = async (id: string) => {
  return await AuditoriaStockRepository.findByStock(id);
};

const obtenerPorId = async (id: string) => {
  return await AuditoriaStockRepository.findById(id);
};

export default {registrarAuditoria,listarAuditorias,obtenerPorStock,obtenerPorId,};
