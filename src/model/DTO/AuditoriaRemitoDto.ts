 interface AuditoriaRemitoDTO {
  _id?: string;
  id_remito: string; 
  id_usuario: string; 
  campo_modificado: string;
  valor_anterior: string;
  valor_nuevo: string;
  fecha_y_hora?: Date;
  descripcion: string;
  numero_remito?: number;
  nombre_usuario?: string;
}
export default AuditoriaRemitoDTO; 