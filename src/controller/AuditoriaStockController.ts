import { Request, Response } from "express";
import AuditoriaStockService from "../service/AuditoriaStockService";

export const registrarAuditoria = async (req: Request, res: Response) => {
  try {
    const nueva = await AuditoriaStockService.registrarAuditoria(req.body);
    res.status(201).json(nueva);
  } catch (error: any) {
    console.error("Error al registrar auditoría de stock:", error);
    res.status(400).json({ error: error.message || "Error al registrar auditoría" });
  }
};

export const listarAuditorias = async (req: Request, res: Response) => {
  try {
    const auditorias = await AuditoriaStockService.listarAuditorias();
    res.status(200).json(auditorias);
  } catch (error) {
    res.status(500).json({ error: "Error al listar auditorías" });
  }
};

export const obtenerAuditoriasPorStock = async (req: Request, res: Response) => {
  try {
    const auditorias = await AuditoriaStockService.obtenerPorStock(req.params.id_stock);
    res.status(200).json(auditorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener auditorías por stock" });
  }
};

export const obtenerAuditoriaPorId = async (req: Request, res: Response) => {
  try {
    const auditoria = await AuditoriaStockService.obtenerPorId(req.params.id);
    if (!auditoria) {
      res.status(404).json({ error: "Auditoría no encontrada" });
      return;
    }
    res.status(200).json(auditoria);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener auditoría por ID" });
  }
};
