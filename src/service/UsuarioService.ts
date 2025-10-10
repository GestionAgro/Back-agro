import UsuarioRepository from "../repository/UsuarioRepository";
import Usuario from "../model/Usuario";
import Rol from "../model/Rol";
import UsuarioDTO from "../model/DTO/UsuarioDto";

const listarUsuarios = async () => {
  return await UsuarioRepository.findAll();
};

const obtenerUsuario = async (id: string) => {
    return await UsuarioRepository.findById(id);
};

const crearUsuario = async (usuariodto: UsuarioDTO) => {
  if (!Object.values(Rol).includes(usuariodto.rol)) {
    throw new Error(`Rol inválido`);
  }

  const usuarioExistente = await UsuarioRepository.findByEmail(usuariodto.email);
  if (usuarioExistente) {
    return usuarioExistente;
  }
  return await UsuarioRepository.create(usuariodto);
};

const actualizarUsuario = async (id: string, usuariodto: Partial<UsuarioDTO>) => {
    return await UsuarioRepository.update(id, usuariodto);
};

const borrarUsuario = async (id: string) => {
    return await UsuarioRepository.remove(id);
};

export default { listarUsuarios,obtenerUsuario,crearUsuario,actualizarUsuario,borrarUsuario };