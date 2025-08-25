interface Factura {
    _id?: string;
    estado: string;
    numero_factura: number;
    tipo_factura: string;
    empresa: string;
    importe: number;
    recibido_por: string;
    id_remito: string;
    
    
}

export default Factura;