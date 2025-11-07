import { Request,Response } from "express";
import UsuarioService from "../service/UsuarioService";
import { UsuarioModel } from "../schema/UsuarioSchema";


export const listarUsuarios = async (req: Request, res: Response) => {
   try{
    const usuarios = await UsuarioService.listarUsuarios();
    res.status(200).json(usuarios);
   }catch(error){
    res.status(500).json({error: "error al obtener los usarios"});
   }
};

export const obtenerUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await UsuarioService.obtenerUsuario(req.params.id);
    if (!usuario) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await UsuarioService.crearUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el usuario" });
  }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await UsuarioService.actualizarUsuario(req.params.id, req.body);
    if (!usuario) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: "No se pudo actualizar el usuario" });
  }
};

export const borrarUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await UsuarioService.borrarUsuario(req.params.id);
    if (!usuario) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    res.status(200).json({ error: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "No se pudo eliminar el usuario" });
  }
  
};

export const obtenerRolPorUid = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const rol = await UsuarioService.obtenerRolPorUid(uid);
    res.status(200).json({ rol });
  } catch (error) {
    res.status(400).json({ error: "Error al cambiar el rol" });
  }
};

export const cambiarRol = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;

    const actualizado = await UsuarioService.cambiarRol(id, rol);
    if (!actualizado) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al cambiar el rol" });
  }
};
