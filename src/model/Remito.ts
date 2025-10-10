import { Types } from "mongoose";

export enum EstadoRemito {
  EN_ESPERA = "EN_ESPERA",
  FACTURADO = "FACTURADO",
}
export interface ProductoDetalleRemito {
  id_producto:  Types.ObjectId;     
  nombre_producto: string;  
  cantidad: number;         
}

interface Remito {
  _id?: Types.ObjectId;
  numero_remito: number;
  fecha: Date;
  empresa: string;
  productos: ProductoDetalleRemito[];
  recibido_por: Types.ObjectId; 
  estado: EstadoRemito; 
}

export default Remito; 