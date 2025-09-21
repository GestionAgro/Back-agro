import Persona from "../model/Persona";
import PersonaRepository from "../repository/PersonaRepository";
const listar = async (): Promise<Persona[]> => {
  return await PersonaRepository.listar();
};

const obtenerPorId = async (id: string): Promise<Persona | null> => {
  return await PersonaRepository.obtenerPorId(id);
};

const crear = async (data: Persona): Promise<Persona> => {
  return await PersonaRepository.crear(data);
};

const actualizar = async (id: string, data: Partial<Persona>): Promise<Persona | null> => {
  return await PersonaRepository.actualizar(id, data);
};

const borrar = async (id: string): Promise<Persona | null> => {
  return await PersonaRepository.borrar(id);
};

export default { listar, obtenerPorId, crear, actualizar, borrar };
