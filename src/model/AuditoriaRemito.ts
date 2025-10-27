import { Types } from "mongoose";

 interface AuditoriaRemito {
  _id?: Types.ObjectId;
  id_remito: Types.ObjectId;
  id_usuario: Types.ObjectId; 
  campo_modificado: string;
  valor_anterior: string;
  valor_nuevo: string;
  fecha_y_hora?: Date;
  descripcion: string;
  numero_remito?: number;
  nombre_usuario?: string;
}
export default AuditoriaRemito;