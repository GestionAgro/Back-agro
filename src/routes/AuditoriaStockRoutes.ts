import { Router } from "express";
import {registrarAuditoria,listarAuditorias,obtenerAuditoriasPorStock,obtenerAuditoriaPorId,} from "../controller/AuditoriaStockController";

const router = Router();

router.post("/", registrarAuditoria);
router.get("/", listarAuditorias);
router.get("/:id", obtenerAuditoriaPorId);
router.get("/stock/:id_stock", obtenerAuditoriasPorStock);

export default router;
