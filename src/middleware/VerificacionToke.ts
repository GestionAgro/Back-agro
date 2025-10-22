import { Request, Response, NextFunction } from "express";
import admin from "../config/FirebaseAdmin";

export const verificarTokenFirebase = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
     res.status(401).json({ error: "Token no proporcionado" });
    return;
    }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.locals.user = decodedToken; //aca va el usarioa tenticado
    next();
  } catch (error) {
    console.error("Error al verificar token:", error);
    res.status(401).json({ error: "Token inválido" });
  }
};
