import { Types } from "mongoose";

export enum EstadoRemito {
  PENDIENTE = "PENDIENTE",
  FACTURADO = "FACTURADO",
}
export interface ProductoDetalleRemito {
  id_producto:  Types.ObjectId;     
  nombre_producto: string;  
  cantidad: number; 
  unidad?: String      
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