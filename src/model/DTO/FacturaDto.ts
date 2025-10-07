import { ObjectId, Types } from "mongoose";

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
    empresa: string;
    importe: number;
    recibido_por: string; 
    estado: EstadoFactura;
    
}

export default FacturaDto;