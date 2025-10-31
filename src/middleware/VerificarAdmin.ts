import { Request, Response, NextFunction } from "express";
import { UsuarioModel } from "../schema/UsuarioSchema";
import UsuarioRepository from "../repository/UsuarioRepository";

export const soloAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const uid = res.locals.user?.uid;

  if (!uid) {
    res.status(401).json({ error: "Usuario no autenticado" });
    return;
  }

  try {
    const usuario = await UsuarioRepository.findByFirebaseUid(uid);

    if (!usuario) {
     res.status(404).json({ error: "Usuario no encontrado" });
     return;
    }

    if (usuario.rol !== "ADMINISTRADOR") {
      res.status(403).json({ error: "Acceso denegado" });
     return;
    }

    next();
  } catch (error) {
    console.error("Error en soloAdmin:", error);
    res.status(500).json({ error: "Error interno en verificación de rol" });
  }
};