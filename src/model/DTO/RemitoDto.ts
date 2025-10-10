import { Types } from "mongoose";
import { PersonaResumenDto } from "./FacturaDto";

export enum EstadoRemito {
  EN_ESPERA = "EN_ESPERA",
  FACTURADO = "FACTURADO",
}
interface ProductoDetalleRemito {
  id_producto:  string; 
  nombre_producto: string;  
  cantidad: number;         
}

interface RemitoDto {
  _id?: string;
  numero_remito: number;
  fecha: Date;
  empresa: string;
  productos: ProductoDetalleRemito[];
  recibido_por: PersonaResumenDto; 
  estado: EstadoRemito; 
}

export default RemitoDto; 