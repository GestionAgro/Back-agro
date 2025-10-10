import RemitoRepository from "../repository/RemitoRepository";
import Remito, { EstadoRemito } from "../model/Remito";
import ProductoService from "./ProductoService";
import ProductoRepository from "../repository/ProductoRepository";
import RemitoDto from "../model/DTO/RemitoDto";

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
    if (!producto._id) {
  throw new Error("El producto no tiene ID definido");
}
    const nuevaCantidad = producto.cantidad_actual + detalle.cantidad;
    await ProductoRepository.update(producto._id, {cantidad_actual: nuevaCantidad,});

    detalle.id_producto = producto._id.toString();
    detalle.nombre_producto = producto.nombre_producto;
  } else {
    producto = await ProductoRepository.create({nombre_producto: detalle.nombre_producto,cantidad_actual: detalle.cantidad,});
     
    if(!producto._id){
      throw new Error("Error al crear producoto: no se genero id")
    }
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

const crearRemito = async (remitoDto: RemitoDto) => {
remitoDto.fecha = validarFecha(remitoDto.fecha);
  const existe = await  RemitoRepository.findByNumero(remitoDto.numero_remito);
  if (existe){
   throw new Error(`Ya existe una factura con el número ${remitoDto.numero_remito}`);
  }
  
  const productosActualizados = [];
  for (const detalle of remitoDto.productos) {
    const actualizado = await actualizarOCrearProducto(detalle);
    productosActualizados.push(actualizado);
  }

  remitoDto.productos = productosActualizados;
  return await RemitoRepository.create(remitoDto);
};



const actualizarRemito = async (id: string, remitoDto: Partial<RemitoDto>) => {
  return await RemitoRepository.update(id, remitoDto);
};

const borrarRemito = async (id: string) => {
  return await RemitoRepository.remove(id);
};

const obtenerPorNumero = async (numero: number): Promise<RemitoDto | null> => {
  return await RemitoRepository.findByNumero(numero);
};

const actualizarEstado = async (numero_remito: number) => {
  return await RemitoRepository.updateByNumero(numero_remito, {
    estado: EstadoRemito.FACTURADO
  });
};

export default { listarRemitos, obtenerRemito, crearRemito, actualizarRemito, borrarRemito, obtenerPorNumero, actualizarEstado};
