import { Router } from "express";
import { listarRemitos, obtenerRemito, crearRemito, actualizarRemito, borrarRemito,obtenerRemitoPorNumero } from "../controller/RemitoController";
import { verificarTokenFirebase } from "../middleware/VerificacionToke";

const router = Router();

router.get("/", listarRemitos);
router.get("/numero/:numero", obtenerRemitoPorNumero);
router.get("/:id", obtenerRemito);
router.post("/", verificarTokenFirebase,crearRemito);
router.put("/:id",verificarTokenFirebase ,actualizarRemito);
router.delete("/:id", verificarTokenFirebase,borrarRemito);



export default router;
