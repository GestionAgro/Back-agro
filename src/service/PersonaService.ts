import PersonaDTO from "../model/DTO/PersonaDto";
import Persona from "../model/Persona";
import PersonaRepository from "../repository/PersonaRepository";

const listar = async (): Promise<PersonaDTO[]> => {
  return await PersonaRepository.listar();
};

const obtenerPorId = async (id: string): Promise<PersonaDTO | null> => {
  return await PersonaRepository.obtenerPorId(id);
};

const crear = async (data: PersonaDTO): Promise<PersonaDTO> => {
  return await PersonaRepository.crear(data);
};

const actualizar = async (id: string, data: Partial<PersonaDTO>): Promise<PersonaDTO | null> => {
  return await PersonaRepository.actualizar(id, data);
};

const borrar = async (id: string): Promise<PersonaDTO | null> => {
  return await PersonaRepository.borrar(id);
};

export default { listar, obtenerPorId, crear, actualizar, borrar };
