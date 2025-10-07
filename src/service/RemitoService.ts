import RemitoRepository from "../repository/RemitoRepository";
import Remito, { EstadoRemito } from "../model/Remito";
import ProductoService from "./ProductoService";
import ProductoRepository from "../repository/ProductoRepository";

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


const actualizarOCrearProducto = async (detalle: any) => {
  let producto = await buscarProducto(detalle);

  if (producto) {
    const nuevaCantidad = producto.cantidad_actual + detalle.cantidad;
    await ProductoRepository.update(producto._id, {cantidad_actual: nuevaCantidad,});

    detalle.id_producto = producto._id.toString();
    detalle.nombre_producto = producto.nombre_producto;
  } else {
    producto = await ProductoRepository.create({nombre_producto: detalle.nombre_producto,cantidad_actual: detalle.cantidad,});

    detalle.id_producto = producto._id.toString();
    detalle.nombre_producto = producto.nombre_producto;
  }

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

const crearRemito = async (remito: Remito) => {
remito.fecha = validarFecha(remito.fecha);
  const existe = await  RemitoRepository.findByNumero(remito.numero_remito);
  if (existe){
   throw new Error(`Ya existe una factura con el número ${remito.numero_remito}`);
  }
  
  const productosActualizados = [];
  for (const detalle of remito.productos) {
    const actualizado = await actualizarOCrearProducto(detalle);
    productosActualizados.push(actualizado);
  }

  remito.productos = productosActualizados;
  return await RemitoRepository.create(remito);
};



const actualizarRemito = async (id: string, remito: Partial<Remito>) => {
  return await RemitoRepository.update(id, remito);
};

const borrarRemito = async (id: string) => {
  return await RemitoRepository.remove(id);
};

const obtenerPorNumero = async (numero: number): Promise<Remito | null> => {
  return await RemitoRepository.findByNumero(numero);
};

const actualizarEstado = async (numero_remito: number) => {
  return await RemitoRepository.updateByNumero(numero_remito, {
    estado: EstadoRemito.FACTURADO
  });
};

export default { listarRemitos, obtenerRemito, crearRemito, actualizarRemito, borrarRemito, obtenerPorNumero, actualizarEstado};
