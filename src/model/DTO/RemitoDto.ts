import { Types } from "mongoose";
import { PersonaResumenDto } from "./FacturaDto";

export enum EstadoRemito {
  EN_ESPERA = "EN_ESPERA",
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
  recibido_por: PersonaResumenDto; 
  estado: EstadoRemito; 
}

export default RemitoDto; 