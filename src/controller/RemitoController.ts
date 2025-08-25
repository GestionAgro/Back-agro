import { Request, Response } from "express";
import RemitoService from "../service/RemitoService";

export const listarRemitos = async (req: Request, res: Response) => {
  try {
    const remitos = await RemitoService.listarRemitos();
    res.status(200).json(remitos);
  }catch (error) {
  console.error("Error exacto en listarRemitos:", error);
  res.status(500).json({ error: "Error al listar remitos" });
}
};

export const obtenerRemito = async (req: Request, res: Response) => {
  try {
    const remito = await RemitoService.obtenerRemito(req.params.id);
    if (!remito) {
      res.status(404).json({ message: "Remito no encontrado" });
    } else {
      res.status(200).json(remito);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener remito" });
  }
};

export const crearRemito = async (req: Request, res: Response) => {
  try {
    const nuevo = await RemitoService.crearRemito(req.body);
    res.status(201).json(nuevo);
  } catch (error:any) {
    console.error("error exacto en crer remit:",error);
    res.status(400).json({error:error.message || "Error al crear remito" });
  }
};

export const actualizarRemito = async (req: Request, res: Response) => {
  try {
    const actualizado = await RemitoService.actualizarRemito(req.params.id, req.body);
    if (!actualizado) {
      res.status(404).json({ message: "Remito no encontrado" });
    } else {
      res.status(200).json(actualizado);
    }
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar remito" });
  }
};


export const borrarRemito = async (req: Request, res: Response) => {
  try {
    const eliminado = await RemitoService.borrarRemito(req.params.id);
    if (!eliminado) {
      res.status(404).json({ message: "Remito no encontrado" });
    } else {
      res.status(200).json({ message: "Remito eliminado correctamente" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar remito" });
  }
};

export const obtenerRemitoPorNumero = async (req: Request, res: Response) => {
  try {
    const numero = Number(req.params.numero); 
    const remito = await RemitoService.obtenerPorNumero(numero);

    if (!remito) {
     res.status(404).json({ message: "Remito no encontrado" });
     return;
    }

    res.status(200).json(remito);
  } catch (error) {
    console.error("Error exacto en obtenerRemitoPorNumero:", error);
    res.status(500).json({ error: "Error al obtener remito" });
  }
};


