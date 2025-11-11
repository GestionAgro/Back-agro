import { ObjectId, Types } from "mongoose";
import Persona from "../Persona";

export enum EstadoFactura {
  PENDIENTE = "PENDIENTE",
  IMPUTADA = "IMPUTADA",
}

export enum TipoFactura {
  A = "A",
  B = "B",
  C = "C",
}
 
export interface PersonaResumenDto{
   _id: string;
  nombre: string;
  tipo_persona?: string;
}

interface FacturaDto {
    _id?:  string; 
    numero_remito: number;
    numero_factura: number; 
    tipo_factura: TipoFactura;
    fecha: Date;
    empresa: string;
    importe: number;
    recibido_por: PersonaResumenDto;
    estado: EstadoFactura;

    
}

export default FacturaDto;