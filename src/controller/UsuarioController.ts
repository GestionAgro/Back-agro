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
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};


export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const usuarioExistente = await UsuarioModel.findOne({ email });
    if (usuarioExistente) {
      res.status(200).json(usuarioExistente);
      return; 
    }

    const usuario = await UsuarioService.crearUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "No se pudo crear el usuario" });
  }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await UsuarioService.actualizarUsuario(req.params.id, req.body);
    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
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
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "No se pudo eliminar el usuario" });
  }
  
};
