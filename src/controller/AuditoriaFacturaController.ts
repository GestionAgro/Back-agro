import { Request,Response } from "express";
import AuditoriaFacturaService from "../service/AuditoriaFacturaService";

export const registrarAuditoria = async (req: Request, res: Response) => {
  try {
    const nueva = await AuditoriaFacturaService.registrarAuditoria(req.body);
    res.status(201).json(nueva);
  } catch (error: any) {
    console.error("Error exacto en registrar auditoria:", error);
    res.status(400).json({ error: error.message || "Error al registrar auditoria" });
  }
};

export const listarAuditorias = async (req: Request, res: Response) => {
  try {
    const auditorias = await AuditoriaFacturaService.listarAuditorias();
    res.status(200).json(auditorias);
  } catch (error) {
    res.status(500).json({ error: "Error al listar auditorias" });
  }
};

export const obtenerAuditoriasPorFactura = async (req: Request, res: Response) => {
  try {
    const auditorias = await AuditoriaFacturaService.obtenerPorFactura(req.params.id_factura);
    res.status(200).json(auditorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener auditorias por factura" });
  }
};

export const obtenerAuditoriaPorId = async (req: Request, res: Response) => {
  try {
    const auditoria = await AuditoriaFacturaService.obtenerPorId(req.params.id);
    if (!auditoria) {
      res.status(404).json({ error: "Auditoría no encontrada" });
     return;
    }
    res.status(200).json(auditoria);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener auditoría por ID" });
  }
};