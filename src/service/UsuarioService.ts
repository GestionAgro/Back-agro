import UsuarioRepository from "../repository/UsuarioRepository";
import Usuario from "../model/Usuario";

const listarUsuarios = async () => {
  return await UsuarioRepository.findAll();
};

const obtenerUsuario = async (id: string) => {
    return await UsuarioRepository.findById(id);
};

const crearUsuario = async (usuario: Usuario) => {
    return await UsuarioRepository.create(usuario);
};

const actualizarUsuario = async (id: string, usuario: Partial<Usuario>) => {
    return await UsuarioRepository.update(id, usuario);
};

const borrarUsuario = async (id: string) => {
    return await UsuarioRepository.remove(id);
};

export default { listarUsuarios,obtenerUsuario,crearUsuario,actualizarUsuario,borrarUsuario };