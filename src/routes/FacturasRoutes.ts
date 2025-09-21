import { Router } from "express";
import { listarFactura,crearFactura,obtenerFacturaPorNumero,actualizarFactura,borrarFactura,obtenerFactura,asociarRemitoAFactura } from "../controller/FacturaController";

const router = Router();

router.get("/", listarFactura);
router.get("/numero/:numero", obtenerFacturaPorNumero);
router.put("/:id/asociar-remito", asociarRemitoAFactura);
router.get("/:id", obtenerFactura);
router.post("/", crearFactura);
router.put("/:id", actualizarFactura);
router.delete("/:id", borrarFactura);



export default router;