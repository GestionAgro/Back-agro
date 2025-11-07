import { Request, Response } from "express";
import AuditoriaRemitoService from "../service/AuditoriaRemitoService";

export const registrarAuditoria = async (req: Request, res: Response) => {
  try {
    const nueva = await AuditoriaRemitoService.registrarAuditoria(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: "Error al registrar auditoria" });
  }
};

export const listarAuditorias = async (req: Request, res: Response) => {
  try {
    const auditorias = await AuditoriaRemitoService.listarAuditorias();
    res.status(200).json(auditorias);
  } catch (error) {
    res.status(500).json({ error: "Error al listar auditorias" });
  }
};

export const obtenerAuditoriasPorRemito = async (req: Request, res: Response) => {
  try {
    const auditorias = await AuditoriaRemitoService.obtenerPorRemito(req.params.id_remito);
    res.status(200).json(auditorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener auditorias por remito" });
  }
};

export const obtenerAuditoriaPorId = async (req: Request, res: Response) => {
  try {
    const auditoria = await AuditoriaRemitoService.obtenerPorId(req.params.id);
    if (!auditoria) {
      res.status(404).json({ error: "Auditoría no encontrada" });
      return;
    }
    res.status(200).json(auditoria);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener auditoría por ID" });
  }
};
