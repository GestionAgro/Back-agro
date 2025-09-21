import { Router } from "express";
import { listarPersonas, obtenerPersona,crearPersona,actualizarPersona, borrarPersona} from "../controller/PersonaController";

const router = Router();

router.get("/", listarPersonas);
router.get("/:id", obtenerPersona);
router.post("/", crearPersona);
router.put("/:id", actualizarPersona);
router.delete("/:id", borrarPersona);

export default router;
