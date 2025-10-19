import { Router } from "express";
import { listarFactura,crearFactura,obtenerFacturaPorNumero,actualizarFactura,borrarFactura,obtenerFactura,asociarRemitoAFactura } from "../controller/FacturaController";
import { verificarTokenFirebase } from "../middleware/VerificacionToke";

const router = Router();

router.get("/", listarFactura);
router.get("/numero/:numero", obtenerFacturaPorNumero);
router.put("/:id/asociar-remito",verificarTokenFirebase ,asociarRemitoAFactura);
router.get("/:id", obtenerFactura);
router.post("/",verificarTokenFirebase ,crearFactura);
router.put("/:id", verificarTokenFirebase,actualizarFactura);
router.delete("/:id",verificarTokenFirebase ,borrarFactura);



export default router;