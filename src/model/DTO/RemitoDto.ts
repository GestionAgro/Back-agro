import { Types } from "mongoose";

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
  recibido_por: string; 
  estado: EstadoRemito; 
}

export default RemitoDto; 