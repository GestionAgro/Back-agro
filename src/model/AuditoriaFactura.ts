interface AuditoriaFactura {
  _id?: string;
  id_factura: string; 
  id_usuario: string; 
  campo_modificado: string;
  valor_anterior: string;
  valor_nuevo: string;
  fecha_y_hora?: Date;
  descripcion: string;
}

export default AuditoriaFactura;