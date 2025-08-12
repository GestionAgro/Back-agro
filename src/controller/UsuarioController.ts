import { Request,Response } from "express";
import { Usuario } from "../schema/Usuario";

export const crearUsuario = async (req: Request, res: Response) => {
    try{
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    }catch(error){
        res.status(400).json({ error: error});
    }
};

export const listarUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
};