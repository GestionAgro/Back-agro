import { Types } from "mongoose";
import PersonaDTO from "./PersonaDto";

export enum EstadoRemito {
  PENDIENTE = "PENDIENTE",
  FACTURADO = "FACTURADO",
}
export interface ProductoDetalleRemitoDto {
  id_producto:  string; 
  nombre_producto: string;  
  cantidad: number; 
  unidad?: string;        
}

interface RemitoDto {
  _id?: string;
  numero_remito: number;
  fecha: Date;
  empresa: string;
  productos: ProductoDetalleRemitoDto[];
  recibido_por: PersonaDTO;
  estado: EstadoRemito; 
}

export default RemitoDto; 