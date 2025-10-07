import { Request, Response } from "express";
import ProductoService from "../service/ProductoService";


export const listarProductos = async (_req: Request, res: Response) => {
  try {
    const productos = await ProductoService.listarProductos();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al listar productos", details: error });
  }
};

export const obtenerProducto = async (req: Request, res: Response) => {
  try {
    const producto = await ProductoService.obtenerProducto(req.params.id);
    if (!producto) {
        res.status(404).json({ message: "Producto no encontrado" });
       return;
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener producto", details: error });
  }
};

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const nuevo = await ProductoService.crearProducto(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: "Error al crear producto", details: error });
  }
};

export const actualizarProducto = async (req: Request, res: Response) => {
  try {
    const actualizado = await ProductoService.actualizarProducto(req.params.id, req.body);
    if (!actualizado) { 
        res.status(404).json({ message: "Producto no encontrado" });
    return;
    }
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar producto", details: error });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    await ProductoService.eliminarProducto(req.params.id);
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar producto", details: error });
  }
};

export const ajustarStock = async (req: Request, res: Response) => {
  try {
    const { cantidad } = req.body;
    const actualizado = await ProductoService.ajustarStock(req.params.id, cantidad);
    res.status(200).json(actualizado);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
