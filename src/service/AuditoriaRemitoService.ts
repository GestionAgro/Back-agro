import AuditoriaRemitoRepository from "../repository/AuditoriaRemitoRepository";
import AuditoriaRemitoDTO from "../model/DTO/AuditoriaRemitoDto";

const registrarAuditoria = async (dto: AuditoriaRemitoDTO) => {
  return await AuditoriaRemitoRepository.create(dto);
};

const listarAuditorias = async () => {
  return await AuditoriaRemitoRepository.findAll();
};

const obtenerPorRemito = async (id: string) => {
  return await AuditoriaRemitoRepository.findByRemito(id);
};

const obtenerPorId = async (id: string) => {
  return await AuditoriaRemitoRepository.findById(id);
};

export default {registrarAuditoria,listarAuditorias,obtenerPorRemito,obtenerPorId,};
