import { Types } from "mongoose";

interface Evento {
    _id?: Types.ObjectId;
    id_persona: Types.ObjectId;
    fechaYhora: Date;
    tipo_operacion: string;
    entidad_afectada: string;
    id_entidad: Types.ObjectId;
    descripcion: string;

}

export default Evento;