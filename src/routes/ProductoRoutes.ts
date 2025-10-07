import { Router } from "express";
import {listarProductos, obtenerProducto, crearProducto,actualizarProducto, eliminarProducto, ajustarStock} from "../controller/ProductoController";

const router = Router();

router.get("/", listarProductos);
router.patch("/:id/ajustar", ajustarStock);
router.get("/:id", obtenerProducto);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);



export default router;