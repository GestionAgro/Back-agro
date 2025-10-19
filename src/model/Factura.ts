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

interface Factura {
    _id?:  Types.ObjectId; 
    numero_remito: number;
    numero_factura: number; 
    tipo_factura: TipoFactura;
    empresa: string;
    importe: number;
    recibido_por: Types.ObjectId; 
    estado: EstadoFactura;
    id_usuario: Types.ObjectId;
    
}

export default Factura;