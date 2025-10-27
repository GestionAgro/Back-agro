import { Types } from "mongoose";

interface AuditoriaFactura {
  _id?: Types.ObjectId;
  id_factura: Types.ObjectId; 
  id_usuario: Types.ObjectId; 
  campo_modificado: string;
  valor_anterior: string;
  valor_nuevo: string;
  fecha_y_hora?: Date;
  descripcion: string;
  numero_factura?: number;
  nombre_usuario?: string;
}

export default AuditoriaFactura;