import { Router } from "express";
import { listarEventos,crearEvento,eliminarEvento,obtenerEvento } from "../controller/EventoController";


const router = Router();

router.get("/", listarEventos);
router.get("/:id", obtenerEvento);
router.post("/", crearEvento);
router.delete("/:id", eliminarEvento);

export default router;
