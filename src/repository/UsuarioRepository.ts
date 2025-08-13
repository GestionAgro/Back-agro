import Usuario from "../model/Usuario";
import { UsuarioModel } from "../schema/UsuarioSchema";

const findAll = async() => {
    return await UsuarioModel.find();
};

const findById = async (id:string) => {
    return await UsuarioModel.findById(id);
};

const create = async (usuario: Usuario) => {
    return await UsuarioModel.create(usuario);
};

const update = async (id: string, usuario: Partial<Usuario>) => {
    return await UsuarioModel.findByIdAndUpdate(id,usuario, {new: true})
};

const remove = async( id: string) => {
    return await UsuarioModel.findByIdAndDelete(id)
};

export default{findAll,findById,create,update,remove};
