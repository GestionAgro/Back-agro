import { PersonaModel } from "../schema/PersonaSchema";
import Persona from "../model/Persona";

const listar = async (): Promise<Persona[]> => {
  return await PersonaModel.find();
};

const obtenerPorId = async (id: string): Promise<Persona | null> => {
  return await PersonaModel.findById(id);
};

const crear = async (data: Persona): Promise<Persona> => {
  const persona = new PersonaModel(data);
  return await persona.save();
};

const actualizar = async (id: string, data: Partial<Persona>): Promise<Persona | null> => {
  return await PersonaModel.findByIdAndUpdate(id, data, { new: true });
};

const borrar = async (id: string): Promise<Persona | null> => {
  return await PersonaModel.findByIdAndDelete(id);
};

export default { listar, obtenerPorId, crear, actualizar, borrar };
