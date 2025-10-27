import { Router } from "express";
import {listarProductos, obtenerProducto, crearProducto,actualizarProducto, eliminarProducto, ajustarStock} from "../controller/ProductoController";
import { verificarTokenFirebase } from "../middleware/VerificacionToke";

const router = Router();

router.get("/", listarProductos);
router.patch("/:id/ajustar",verificarTokenFirebase ,ajustarStock);
router.get("/:id", obtenerProducto);
router.post("/", verificarTokenFirebase,crearProducto);
router.put("/:id", verificarTokenFirebase,actualizarProducto);
router.delete("/:id", verificarTokenFirebase,eliminarProducto);



export default router;