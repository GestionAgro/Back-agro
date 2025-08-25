import UsuarioRepository from "../repository/UsuarioRepository";
import Usuario from "../model/Usuario";
import Rol from "../model/Rol";

const listarUsuarios = async () => {
  return await UsuarioRepository.findAll();
};

const obtenerUsuario = async (id: string) => {
    return await UsuarioRepository.findById(id);
};

const crearUsuario = async (usuario: Usuario) => {
  if (!Object.values(Rol).includes(usuario.rol)) {
    throw new Error(`Rol inválido`);
  }

  const usuarioExistente = await UsuarioRepository.findByEmail(usuario.email);
  if (usuarioExistente) {
    return usuarioExistente;
  }
  return await UsuarioRepository.create(usuario);
};

const actualizarUsuario = async (id: string, usuario: Partial<Usuario>) => {
    return await UsuarioRepository.update(id, usuario);
};

const borrarUsuario = async (id: string) => {
    return await UsuarioRepository.remove(id);
};

export default { listarUsuarios,obtenerUsuario,crearUsuario,actualizarUsuario,borrarUsuario };