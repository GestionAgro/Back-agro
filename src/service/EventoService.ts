import EventoRepository from "../repository/EventoRepository";
import EventoDTO from "../model/DTO/EventoDto";


const listarEventos = async () => {
  return await EventoRepository.findAll();
};

const obtenerEvento = async (id: string) => {
  return await EventoRepository.findById(id);
};

const crearEvento = async (eventoDto: EventoDTO) => {
  if (!eventoDto.id_persona || !eventoDto.entidad_afectada || !eventoDto.id_entidad) {
    throw new Error("Faltan campos obligatorios para crear el evento");
  }
  return await EventoRepository.create(eventoDto);
};

const eliminarEvento = async (id: string) => {
  return await EventoRepository.remove(id);
};

export default { listarEventos, obtenerEvento, crearEvento, eliminarEvento };