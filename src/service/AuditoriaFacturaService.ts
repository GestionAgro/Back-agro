import AuditoriaFacturaRepository from "../repository/AuditoriaFacturaRepository";
import AuditoriaFacturaDTO from "../model/DTO/AuditoriaFacturaDto";


const registrarAuditoria = async (dto: AuditoriaFacturaDTO) => {
  return await AuditoriaFacturaRepository.create(dto);
};

const listarAuditorias = async () => {
  return await AuditoriaFacturaRepository.findAll();
};

const obtenerPorFactura = async (id: string) => {
  return await AuditoriaFacturaRepository.findByFactura(id);
};

const obtenerPorId = async (id: string) => {
  return await AuditoriaFacturaRepository.findById(id);
};

export default {registrarAuditoria,listarAuditorias,obtenerPorFactura, obtenerPorId};