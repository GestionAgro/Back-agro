import { Router } from "express";
import { registrarAuditoria,listarAuditorias,obtenerAuditoriasPorFactura, obtenerAuditoriaPorId } from "../controller/AuditoriaFacturaController";


const router = Router();

router.post("/", registrarAuditoria);
router.get("/", listarAuditorias);
router.get("/:id", obtenerAuditoriaPorId);
router.get("/factura/:id_factura", obtenerAuditoriasPorFactura);

export default router;