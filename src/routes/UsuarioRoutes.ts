import { Router } from "express";
import { listarUsuarios,obtenerUsuario,crearUsuario,actualizarUsuario,borrarUsuario } from "../controller/UsuarioController";


const router = Router();


router.get("/", listarUsuarios);
router.get("/:id", obtenerUsuario);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", borrarUsuario);



export default router; 