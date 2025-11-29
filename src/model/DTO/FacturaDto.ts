import { ObjectId, Types } from "mongoose";
import Persona from "../Persona";
import PersonaDTO from "./PersonaDto";

export enum EstadoFactura {
  PENDIENTE = "PENDIENTE",
  IMPUTADA = "IMPUTADA",
}

export enum TipoFactura {
  A = "A",
  B = "B",
  C = "C",
}
 

interface FacturaDto {
    _id?:  string; 
    numero_remito: number;
    numero_factura: number; 
    tipo_factura: TipoFactura;
    fecha: Date;
    empresa: string;
    importe: number;
    recibido_por: PersonaDTO;
    estado: EstadoFactura;

    
}

export default FacturaDto;