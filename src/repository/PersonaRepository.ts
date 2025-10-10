import { PersonaModel } from "../schema/PersonaSchema";
import PersonaDTO from "../model/DTO/PersonaDto";
import Persona from "../model/Persona";
import { mapDtoToEntity, mapEntityToDto } from "../mappers/PersonaMapper";

const listar = async (): Promise<PersonaDTO[]> => {
  const docs = await PersonaModel.find();
  return docs.map(mapEntityToDto);
};

const obtenerPorId = async (id: string): Promise<PersonaDTO | null> => {
  const doc =  await PersonaModel.findById(id);
  return doc ? mapEntityToDto(doc) : null;
}; 

const crear = async (dto: PersonaDTO): Promise<PersonaDTO> => {
  const entity = mapDtoToEntity(dto);
  const created = await PersonaModel.create(entity)
  return mapEntityToDto(created);
};

const actualizar = async (id: string, dto: Partial<PersonaDTO>): Promise<PersonaDTO | null> => {
 const entity = mapDtoToEntity(dto as PersonaDTO);
 const updated =  await PersonaModel.findByIdAndUpdate(id, entity, { new: true });
 return updated ?  mapEntityToDto(updated) : null;
};

const borrar = async (id: string): Promise<PersonaDTO | null> => {
const deleted = await PersonaModel.findByIdAndDelete(id);
return deleted ? mapEntityToDto(deleted) : null;
};

export default { listar, obtenerPorId, crear, actualizar, borrar };
