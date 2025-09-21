export enum TipoPersona {
  ENCARGADO = "ENCARGADO",
  VETERINARIO = "VETERINARIO",
  EMPLEADO = "EMPLEADO",
}

interface Persona {
    _id?: string;
    nombre: string;
    tipo_persona: TipoPersona;
}
export default Persona;