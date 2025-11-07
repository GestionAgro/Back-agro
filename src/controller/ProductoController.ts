import { Request, Response } from "express";
import ProductoService from "../service/ProductoService";


export const listarProductos = async (req: Request, res: Response) => {
  try {
    const productos = await ProductoService.listarProductos();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al listar productos" });
  }
};

export const obtenerProducto = async (req: Request, res: Response) => {
  try {
    const producto = await ProductoService.obtenerProducto(req.params.id);
    if (!producto) {
        res.status(404).json({ error: "Producto no encontrado" });
       return;
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener producto" });
  }
};

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const uid = res.locals?.user?.uid;
    const nuevo = await ProductoService.crearProducto(req.body,uid);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: "Error al crear producto"});
  }
};

export const actualizarProducto = async (req: Request, res: Response) => {
  try {
    const uid = res.locals?.user?.uid;
    const actualizado = await ProductoService.actualizarProducto(req.params.id, req.body,uid);
    if (!actualizado) { 
        res.status(404).json({ error: "Producto no encontrado" });
    return;
    }
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar producto" });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    const uid = res.locals?.user?.uid;
    await ProductoService.eliminarProducto(req.params.id,uid);
    res.status(200).json({ error: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar producto"});
  }
};

export const ajustarStock = async (req: Request, res: Response) => {
  try { 
    const uid = res.locals?.user?.uid;
    const { cantidad, id_persona_retiro } = req.body;
    const actualizado = await ProductoService.ajustarStock(req.params.id, cantidad, uid,id_persona_retiro);
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al ajustar stock" });
  }
};
