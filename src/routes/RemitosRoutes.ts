import { Router } from "express";
import { listarRemitos, obtenerRemito, crearRemito, actualizarRemito, borrarRemito,obtenerRemitoPorNumero } from "../controller/RemitoController";

const router = Router();

router.get("/", listarRemitos);
router.get("/numero/:numero", obtenerRemitoPorNumero);
router.get("/:id", obtenerRemito);
router.post("/", crearRemito);
router.put("/:id", actualizarRemito);
router.delete("/:id", borrarRemito);



export default router;
