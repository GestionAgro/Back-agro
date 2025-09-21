import { Request, Response } from "express";
import PersonaService from "../service/PersonaService";

export const listarPersonas = async (req: Request, res: Response) => {
  try {
    const personas = await PersonaService.listar();
    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las personas" });
  }
};

export const obtenerPersona = async (req: Request, res: Response) => {
  try {
    const persona = await PersonaService.obtenerPorId(req.params.id);
    if (!persona) {
      res.status(404).json({ message: "Persona no encontrada" });
      return;
    }
    res.status(200).json(persona);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la persona" });
  }
};

export const crearPersona = async (req: Request, res: Response) => {
  try {
    const persona = await PersonaService.crear(req.body);
    res.status(201).json(persona);
  }catch (error: any) {
    console.error("Error al crear persona:", error);
    res.status(400).json({ error: error.message });
}
};

export const actualizarPersona = async (req: Request, res: Response) => {
  try {
    const persona = await PersonaService.actualizar(req.params.id, req.body);
    if (!persona) {
      res.status(404).json({ message: "Persona no encontrada" });
      return;
    }
    res.status(200).json(persona);
  } catch (error) {
    res.status(400).json({ error: "No se pudo actualizar la persona" });
  }
};

export const borrarPersona = async (req: Request, res: Response) => {
  try {
    const persona = await PersonaService.borrar(req.params.id);
    if (!persona) {
      res.status(404).json({ message: "Persona no encontrada" });
      return;
    }
    res.status(200).json({ message: "Persona eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "No se pudo eliminar la persona" });
  }
};
