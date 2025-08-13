interface Evento {
    _id?: string;
    id_persona: string;
    fechaYhora: Date;
    tipo_operacion: string;
    entidad_afectada: string;
    id_entidad: string;
    descripcion: string;

}

export default Evento;