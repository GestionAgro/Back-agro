import ProductoRepository from "../repository/ProductoRepository";
import Producto from "../model/Producto";
import ProductoDTO from "../model/DTO/ProductoDto";
import UsuarioRepository from "../repository/UsuarioRepository";
import AuditoriaStockService from "./AuditoriaStockService";
import PersonaRepository from "../repository/PersonaRepository";
import EventoService from "./EventoService";
import { obtenerAuditoriasPorFactura } from "../controller/AuditoriaFacturaController";

const listarProductos = async () => {
  return await ProductoRepository.findall();
};

//------------------------------------------------------------------------------------------------
const obtenerProducto = async (id: string) => {
  return await ProductoRepository.findById(id);
};

//------------------------------------------------------------------------------------------------
export const formatearProductoParaAuditoria = (producto: ProductoDTO) => {
  const { nombre_producto, cantidad_actual, unidad } = producto;
  return { nombre_producto, cantidad_actual, unidad  };
};


//------------------------------------------------------------------------------------------------
const crearProducto = async (productodto: ProductoDTO, firebaseUid: string) => {
    const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);
  if (!usuario || !usuario._id) throw new Error("Usuario no encontrado");
  
  const nombreProducto = productodto.nombre_producto.trim().toLocaleLowerCase();

  const existe = await ProductoRepository.findByName(nombreProducto);
  if(existe){throw new Error("El producto ya existe");}

  productodto.nombre_producto = nombreProducto;

  const nuevoProducto = await ProductoRepository.create(productodto);

  await AuditoriaStockService.registrarAuditoria({
    id_stock: nuevoProducto._id!.toString(),
    id_usuario: usuario._id.toString(),
    nombre_usuario: usuario.nombre,
    campo_modificado: "CREACIÓN",
    valor_anterior: "-",
    valor_nuevo: JSON.stringify(formatearProductoParaAuditoria(nuevoProducto)),
    descripcion: `Se creó el producto ${nuevoProducto.nombre_producto} por ${usuario.nombre}`,
  });

  return nuevoProducto;
};


//------------------------------------------------------------------------------------------------
const actualizarProducto = async (id: string, data: Partial<ProductoDTO>, firebaseUid:string) => {
 const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);
  if (!usuario || !usuario._id) throw new Error("Usuario no encontrado");

  const productoExistente = await ProductoRepository.findById(id);
  if (!productoExistente) throw new Error("Producto no encontrado");

  const productoActualizado = await ProductoRepository.update(id, data);
  if (!productoActualizado) throw new Error("Error al actualizar producto");

  const valorAnterior = {
    nombre_producto:
      productoExistente.nombre_producto !== productoActualizado.nombre_producto
        ? productoExistente.nombre_producto
        : "-",
    cantidad_actual:
      productoExistente.cantidad_actual !== productoActualizado.cantidad_actual
        ? productoExistente.cantidad_actual
        : "-",
    unidad:
    productoExistente.unidad !== productoActualizado.unidad
      ? productoExistente.unidad
      : "-",
  };

  const valorNuevo = {
    nombre_producto:
      productoExistente.nombre_producto !== productoActualizado.nombre_producto
        ? productoActualizado.nombre_producto
        : "-",
    cantidad_actual:
      productoExistente.cantidad_actual !== productoActualizado.cantidad_actual
        ? productoActualizado.cantidad_actual
        : "-",
    unidad:
    productoExistente.unidad !== productoActualizado.unidad
      ? productoActualizado.unidad
      : "-",
  };

  await AuditoriaStockService.registrarAuditoria({
    id_stock: productoActualizado._id!.toString(),
    id_usuario: usuario._id.toString(),
    nombre_usuario: usuario.nombre,
    campo_modificado: "ACTUALIZACIÓN",
    valor_anterior: JSON.stringify(valorAnterior),
    valor_nuevo: JSON.stringify(valorNuevo),
    descripcion: `Producto ${productoActualizado.nombre_producto} actualizado por ${usuario.nombre}`,
  });

  return productoActualizado;
};


//------------------------------------------------------------------------------------------------
const eliminarProducto = async (id: string, firebaseUid: string) => {
  const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);
  if (!usuario || !usuario._id) throw new Error("Usuario no encontrado");

  const producto = await ProductoRepository.findById(id);
  if (!producto) throw new Error("Producto no encontrado");

  await AuditoriaStockService.registrarAuditoria({
    id_stock: id,
    id_usuario: usuario._id.toString(),
    nombre_usuario: usuario.nombre,
    campo_modificado: "ELIMINACIÓN",
    valor_anterior: JSON.stringify(formatearProductoParaAuditoria(producto)),
    valor_nuevo: "-",
    descripcion: `Producto ${producto.nombre_producto} eliminado por ${usuario.nombre}`,
  });

  await ProductoRepository.remove(id);
  return producto;
}


//------------------------------------------------------------------------------------------------
const ajustarStock = async (id: string, cantidad: number, firebaseUid:string, id_persona_retiro: string) =>{
    const producto = await ProductoRepository.findById(id);
    if(!producto) throw new Error(" producto no encontrado");

    const nuevaCantidad = producto.cantidad_actual + cantidad;
    if(nuevaCantidad < 0)   throw new Error("sin stock suficinete");

    const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);
    if (!usuario || !usuario._id) throw new Error("Usuario no encontrado");

    if (!id_persona_retiro) throw new Error("Debe indicar quién retira el producto");
  const persona = await PersonaRepository.obtenerPorId(id_persona_retiro);
  if (!persona || !persona._id) throw new Error("Persona que retira no encontrada");
  
  
  const productoActualizado = await ProductoRepository.update(id, {
    cantidad_actual: nuevaCantidad,
  });
  if (!productoActualizado) throw new Error("Error al ajustar stock");

  const valorAnterior = {
    nombre_producto: producto.nombre_producto,
    cantidad_actual: producto.cantidad_actual,
     unidad: producto.unidad,
  };

  const valorNuevo = {
    nombre_producto: producto.nombre_producto,
    cantidad_actual: nuevaCantidad,
     unidad: producto.unidad,
  };

  await AuditoriaStockService.registrarAuditoria({
    id_stock: producto._id!.toString(),
    id_usuario: usuario._id.toString(),
    nombre_usuario: usuario.nombre,
    campo_modificado: "AJUSTE",
    valor_anterior: JSON.stringify(valorAnterior),
    valor_nuevo: JSON.stringify(valorNuevo),
    descripcion: `Stock ajustado en ${producto.nombre_producto} por ${usuario.nombre} (${cantidad > 0 ? "+" : ""}${cantidad})`,
  });
   await EventoService.crearEvento({
    id_persona: persona._id.toString(),
    fechaYhora: new Date(),
    tipo_operacion: "EGRESO",
    entidad_afectada: "Producto",
    id_entidad: producto._id!.toString(),
    descripcion: `Retiro de ${Math.abs(cantidad)} unidades de ${producto.nombre_producto} por ${persona.nombre}`,
  });
  
  return productoActualizado;
};

export default {listarProductos,obtenerProducto,crearProducto,actualizarProducto,eliminarProducto,ajustarStock};