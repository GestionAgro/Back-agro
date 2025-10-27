import { Types } from "mongoose";

interface AuditoriaStock{
   _id?: Types.ObjectId;
  id_stock:Types.ObjectId; 
  id_usuario: Types.ObjectId; 
  campo_modificado: string;
  valor_anterior: string;
  valor_nuevo: string;
  fecha_y_hora?: Date;
  descripcion: string; 
  nombre_usuario?: string;
}

export default AuditoriaStock;