import { ObjectId, Types } from "mongoose";

export enum TipoPersona {
  ENCARGADO = "ENCARGADO",
  VETERINARIO = "VETERINARIO",
  EMPLEADO = "EMPLEADO",
}

interface Persona {
    _id?: Types.ObjectId; 
    nombre: string;
    tipo_persona: TipoPersona;
}
export default Persona;