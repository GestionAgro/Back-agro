import RemitoRepository from "../repository/RemitoRepository";
import Remito, { EstadoRemito } from "../model/Remito";
import ProductoService from "./ProductoService";
import ProductoRepository from "../repository/ProductoRepository";
import RemitoDto from "../model/DTO/RemitoDto";
import EventoRepository from "../repository/EventoRepository";
import EventoService from "./EventoService";
import AuditoriaRemitoService from "./AuditoriaRemitoService";
import UsuarioRepository from "../repository/UsuarioRepository";
import AuditoriaStockService from "./AuditoriaStockService";


const listarRemitos = async () => {
  return await RemitoRepository.findall();
};

const obtenerRemito = async (id: string) => {
  return await RemitoRepository.findById(id);
}; 

const buscarProducto = async (detalle: any) => {
  let producto = null;

  if (detalle.id_producto) {
    producto = await ProductoRepository.findById(detalle.id_producto);
  }

  if (!producto && detalle.nombre_producto) {
    const todos = await ProductoRepository.findall();
    producto = todos.find((p) =>p.nombre_producto.toLowerCase() === detalle.nombre_producto.toLowerCase());
}
  return producto;
};


const actualizarOCrearProducto = async (detalle: any, firebaseUid: string) => {
  const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);
  if (!usuario || !usuario._id) throw new Error("Usuario no encontrado");

  let producto = await buscarProducto(detalle);
  let tipoOperacion = "CREACIÓN";
  let valorAnterior = "-";

  if (producto) {
    if (!producto._id) throw new Error("El producto no tiene ID definido");

    const nuevaCantidad = producto.cantidad_actual + detalle.cantidad;
    valorAnterior = JSON.stringify({ cantidad_actual: producto.cantidad_actual });

    await ProductoRepository.update(producto._id, { cantidad_actual: nuevaCantidad });
    producto.cantidad_actual = nuevaCantidad;
    tipoOperacion = "AJUSTE";
  } else {
    producto = await ProductoRepository.create({
      nombre_producto: detalle.nombre_producto,
      cantidad_actual: detalle.cantidad,
    });

    if (!producto._id) throw new Error("Error al crear producto: no se generó ID");
  }

  detalle.id_producto = producto._id.toString();
  detalle.nombre_producto = producto.nombre_producto;

  await AuditoriaStockService.registrarAuditoria({
    id_stock: producto._id.toString(),
    id_usuario: usuario._id.toString(),
    nombre_usuario: usuario.nombre,
    campo_modificado: tipoOperacion,
    valor_anterior: valorAnterior,
    valor_nuevo: JSON.stringify({nombre_producto: producto.nombre_producto,cantidad_actual: producto.cantidad_actual, }),
    descripcion: `Producto ${producto.nombre_producto} ${tipoOperacion === "CREACIÓN" ? "creado" : "ajustado"} desde remito`,
  });

  return detalle;
};

const validarFecha = (fecha: Date) => {
  const fechas = new Date(fecha);
  const hoy = new Date();
  const fechaMin = new Date("2000-01-01");

  if (isNaN(fechas.getTime())) {
    throw new Error("Fecha inválida");
  }

  if (fechas > hoy) {
    throw new Error("La fecha no puede ser futura");
  }

  if (fechas < fechaMin) {
    throw new Error("Fecha demasiado antigua");
  }

  return fechas; 
};

export const formatearRemitoParaAuditoria = (remito: any) => {
  const {numero_remito,fecha,empresa,productos,recibido_por,estado,} = remito;

  const productosFormateados = productos.map((p: any) => ({
    nombre_producto: p.nombre_producto,
    cantidad: p.cantidad,
  }));

  const recibidoFormateado = recibido_por
    ? {
        nombre: recibido_por.nombre,
        tipo_persona: recibido_por.tipo_persona,
      }
    : null;

  return {numero_remito,fecha,empresa,productos: productosFormateados,recibido_por: recibidoFormateado,estado,};
};

const crearRemito = async (remitoDto: RemitoDto,firebaseUid: string) => {
  remitoDto.fecha = validarFecha(remitoDto.fecha);
  const existe = await  RemitoRepository.findByNumero(remitoDto.numero_remito);
  if (existe){
   throw new Error(`Ya existe una factura con el número ${remitoDto.numero_remito}`);
  }
  



  
  const productosActualizados = [];
  for (const detalle of remitoDto.productos) {
    const actualizado = await actualizarOCrearProducto(detalle, firebaseUid);
    productosActualizados.push(actualizado);
  }

  remitoDto.productos = productosActualizados;

  const nuevoRemito  = await RemitoRepository.create(remitoDto);
  if (!nuevoRemito._id) {
  throw new Error("Error: no se generó ID para el remito");
}

  await EventoRepository.create({
  id_persona: remitoDto.recibido_por.toString(), 
  id_entidad: nuevoRemito._id.toString(),
  fechaYhora: new Date(),
  tipo_operacion: "CREACIÓN",
  entidad_afectada: "Remito",
  descripcion: `Se creó un nuevo remito de ${remitoDto.empresa}`
});
  
const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);
if (!usuario || !usuario._id) throw new Error("Usuario no encontrado");

const remitoCompleto = await RemitoRepository.findById(nuevoRemito._id);
const remitoAuditable = formatearRemitoParaAuditoria(remitoCompleto);

await AuditoriaRemitoService.registrarAuditoria({
  id_remito: nuevoRemito._id.toString(),
  id_usuario: usuario._id.toString(),
  numero_remito: nuevoRemito.numero_remito,
  nombre_usuario: usuario.nombre,
  campo_modificado: "CREACIÓN",
  valor_anterior: "-",
  valor_nuevo: JSON.stringify(remitoAuditable),
  descripcion: `Se creó el remito ${nuevoRemito.numero_remito} por ${usuario.nombre}`,
});

  
  return nuevoRemito ;
};



const actualizarRemito = async (id: string, remitoDto: Partial<RemitoDto>,firebaseUid: string) => {
 const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);
  if (!usuario || !usuario._id) throw new Error("Usuario no encontrado");

  const remitoExistente = await RemitoRepository.findById(id);
  if (!remitoExistente) throw new Error("Remito no encontrado");

  
  const remitoActualizado = await RemitoRepository.update(id, remitoDto);
  if (!remitoActualizado || !remitoActualizado._id)
    throw new Error("Error al actualizar el remito");
  
  const existenteAuditable = formatearRemitoParaAuditoria(remitoExistente);
const actualizadoAuditable = formatearRemitoParaAuditoria(remitoActualizado);

  const valorAnterior = {
    fecha: remitoExistente.fecha?.toString() !== remitoActualizado.fecha?.toString()
      ? remitoExistente.fecha
      : "-",
    empresa:
      remitoExistente.empresa !== remitoActualizado.empresa
        ? remitoExistente.empresa
        : "-",
  };

  const valorNuevo = {
    fecha: remitoExistente.fecha?.toString() !== remitoActualizado.fecha?.toString()
      ? remitoActualizado.fecha
      : "-",
    empresa:
      remitoExistente.empresa !== remitoActualizado.empresa
        ? remitoActualizado.empresa
        : "-",
  };

  if (valorAnterior.fecha !== "-" || valorAnterior.empresa !== "-") {
    await AuditoriaRemitoService.registrarAuditoria({
      id_remito: remitoActualizado._id.toString(),
      id_usuario: usuario._id.toString(),
      numero_remito: remitoActualizado.numero_remito,
      nombre_usuario: usuario.nombre,
      campo_modificado: "ACTUALIZACIÓN",
      valor_anterior: JSON.stringify(valorAnterior),
      valor_nuevo: JSON.stringify(valorNuevo),
      descripcion: `Remito ${remitoActualizado.numero_remito} actualizado por ${usuario.nombre}`,
    });
  }

  return remitoActualizado;
};

const borrarRemito = async (id: string,firebaseUid: string) => {
const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);
if (!usuario || !usuario._id) throw new Error("Usuario no encontrado");

const remitoExistente = await RemitoRepository.findById(id);
const remitoAuditable = formatearRemitoParaAuditoria(remitoExistente);
if (!remitoExistente) throw new Error("Remito no encontrado");

await AuditoriaRemitoService.registrarAuditoria({
  id_remito: id,
  id_usuario: usuario._id.toString(),
  numero_remito: remitoExistente.numero_remito,
  nombre_usuario: usuario.nombre,
  campo_modificado: "ELIMINACIÓN",
  valor_anterior: JSON.stringify(remitoAuditable),
  valor_nuevo: "-",
  descripcion: `Remito ${remitoExistente.numero_remito} eliminado por ${usuario.nombre}`,
});

await RemitoRepository.remove(id);
return remitoExistente;

};

const obtenerPorNumero = async (numero: number): Promise<RemitoDto | null> => {
  return await RemitoRepository.findByNumero(numero);
};

const actualizarEstado = async (numero_remito: number) => {
  return await RemitoRepository.updateByNumero(numero_remito, {
    estado: EstadoRemito.FACTURADO
  });
};

const reporteMensualRemitos = async () => {
  return await RemitoRepository.reporteMensualRemitos();
};


export default { listarRemitos, obtenerRemito, crearRemito, actualizarRemito, borrarRemito, obtenerPorNumero, actualizarEstado, reporteMensualRemitos};
