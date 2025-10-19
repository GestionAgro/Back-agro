import { Request, Response } from "express";
import EventoService from "../service/EventoService";

export const listarEventos = async (req: Request, res: Response) => {
  try {
    const eventos = await EventoService.listarEventos();
    res.status(200).json(eventos);
  } catch (error) {
    console.error("Error al listar eventos:", error);
    res.status(500).json({ error: "Error al listar eventos" });
  }
};

export const obtenerEvento = async (req: Request, res: Response) => {
  try {
    const evento = await EventoService.obtenerEvento(req.params.id);
    if (!evento) {
     res.status(404).json({ message: "Evento no encontrado" });
    }else {
    res.status(200).json(evento);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener evento" });
  }
};

export const crearEvento = async (req: Request, res: Response) => {
  try {
    const nuevo = await EventoService.crearEvento(req.body);
    res.status(201).json(nuevo);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Error al crear evento" });
  }
};

export const eliminarEvento = async (req: Request, res: Response) => {
  try {
    const eliminado = await EventoService.eliminarEvento(req.params.id);
    if (!eliminado) {
     res.status(404).json({ message: "Evento no encontrado" });
    } else {
    res.status(200).json({ message: "Evento eliminado correctamente" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar evento" });
  }
};