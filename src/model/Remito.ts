export enum EstadoRemito {
  EN_ESPERA = "EN_ESPERA",
  FACTURADO = "FACTURADO",
}

interface Remito {
  _id?: string;
  numero_remito: number;
  fecha: Date;
  empresa: string;
  detalle: string;
  recibido_por: string; 
  estado: EstadoRemito; 
}

export default Remito; 