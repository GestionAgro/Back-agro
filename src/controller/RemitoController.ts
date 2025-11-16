import { Request, Response } from "express";
import RemitoService from "../service/RemitoService";

export const listarRemitos = async (req: Request, res: Response) => {
  try {
    const remitos = await RemitoService.listarRemitos();
    res.status(200).json(remitos);
  }catch (error) {
  res.status(500).json({ error: "Error al listar remitos" });
}
};

export const obtenerRemito = async (req: Request, res: Response) => {
  try {
    const remito = await RemitoService.obtenerRemito(req.params.id);
    if (!remito) {
      res.status(404).json({ error: "Remito no encontrado" });
      return;
    }
    res.status(200).json(remito);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener remito" });
  }
};

export const crearRemito = async (req: Request, res: Response) => {
  try {
    const uid = res.locals?.user?.uid;
    const nuevo = await RemitoService.crearRemito(req.body,uid);
    res.status(201).json(nuevo);
  } catch (error: any) {
    res.status(400).json({error: error.message || "Error en el remito" });
  }
};

export const actualizarRemito = async (req: Request, res: Response) => {
  try {
    const uid = res.locals?.user?.uid;
    const actualizado = await RemitoService.actualizarRemito(req.params.id, req.body,uid);
    if (!actualizado) {
      res.status(404).json({ error: "Remito no encontrado" });
      return;
    } 
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ error:  "Error al actualizar remito" });
  }
};


export const borrarRemito = async (req: Request, res: Response) => {
  try {
    const uid = res.locals?.user?.uid;
    const eliminado = await RemitoService.borrarRemito(req.params.id, uid);
    if (!eliminado) {
      res.status(404).json({ error: "Remito no encontrado" });
      return;
    }
    res.status(200).json({ error: "Remito eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar remito" });
  }
};

export const obtenerRemitoPorNumero = async (req: Request, res: Response) => {
  try {
    const numero = Number(req.params.numero); 
    const remito = await RemitoService.obtenerPorNumero(numero);

    if (!remito) {
     res.status(404).json({ error: "Remito no encontrado" });
     return;
    }
    res.status(200).json(remito);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener remito" });
  }
};

export const reporteMensualRemitos = async (req: Request, res: Response) => {
  try {
    const reporte = await RemitoService.reporteMensualRemitos();
    res.status(200).json(reporte);
  } catch (error) {
    res.status(500).json({ error: "Error al generar reporte mensual de remitos" });
  }
};



