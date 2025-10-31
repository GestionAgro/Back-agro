import { Router } from "express";
import { listarUsuarios,obtenerUsuario,crearUsuario,actualizarUsuario,borrarUsuario, obtenerRolPorUid, cambiarRol } from "../controller/UsuarioController";
import { soloAdmin } from "../middleware/VerificarAdmin";
import { verificarTokenFirebase } from "../middleware/VerificacionToke";


const router = Router();


router.get("/", listarUsuarios);
router.get("/:id", obtenerUsuario);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", borrarUsuario);
router.get("/rol/:uid", obtenerRolPorUid);
router.put("/rol/:id", verificarTokenFirebase, soloAdmin, cambiarRol);



export default router; 