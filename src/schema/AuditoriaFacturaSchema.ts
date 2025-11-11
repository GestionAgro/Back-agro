import { Schema, model } from 'mongoose';
import AuditoriaFactura from '../model/AuditoriaFactura';

const auditoriaFacturaSchema = new Schema<AuditoriaFactura>({
  id_factura: { type: Schema.Types.ObjectId, ref: 'Factura', required: true },
  id_usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  campo_modificado: { type: String, required: true },
  valor_anterior: { type: String, required: true },
  valor_nuevo: { type: String, required: true },
  fecha_y_hora: { type: Date, default: Date.now },
  descripcion: { type: String, required: true },
  numero_factura: { type: Number , required: true},
  nombre_usuario: { type: String, required: true },
}, { versionKey: false });

export const AuditoriaFacturaModel = model<AuditoriaFactura>('AuditoriaFactura', auditoriaFacturaSchema);
