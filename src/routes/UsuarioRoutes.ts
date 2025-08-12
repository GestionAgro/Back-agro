import { Router } from "express";
import { crearUsuario, listarUsuarios } from "../controller/UsuarioController";

const router = Router();

router.post('/', crearUsuario);
router.get('/', listarUsuarios);

export default router;