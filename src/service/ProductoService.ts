import ProductoRepository from "../repository/ProductoRepository";
import Producto from "../model/Producto";

const listarProductos = async () => {
  return await ProductoRepository.findall();
};

const obtenerProducto = async (id: string) => {
  return await ProductoRepository.findById(id);
};

const crearProducto = async (producto: Producto) => {
  return await ProductoRepository.create(producto);
};

const actualizarProducto = async (id: string, data: Partial<Producto>) => {
  return await ProductoRepository.update(id, data);
};

const eliminarProducto = async (id: string) => {
  return await ProductoRepository.remove(id);
};

const ajustarStock = async (id: string, cantidad: number) =>{
    const producto = await ProductoRepository.findById(id);
    if(!producto) throw new Error(" producto no encontrado");

    const nuevaCantidad = producto.cantidad_actual + cantidad;
    if(nuevaCantidad < 0)   throw new Error("sin stock suficinete");
    return await ProductoRepository.update(id,{cantidad_actual: nuevaCantidad});
};

export default {listarProductos,obtenerProducto,crearProducto,actualizarProducto,eliminarProducto,ajustarStock};