import { Router } from "express";
import {registrarAuditoria,listarAuditorias,obtenerAuditoriasPorRemito,obtenerAuditoriaPorId,} from "../controller/AuditoriaRemitoController";

const router = Router();

router.post("/", registrarAuditoria);
router.get("/", listarAuditorias);
router.get("/:id", obtenerAuditoriaPorId);
router.get("/remito/:id_remito", obtenerAuditoriasPorRemito);

export default router;