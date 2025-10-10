import Rol from "../Rol";


interface UsuarioDTO {
    _id?: string;
    nombre: string;
    email: string;
    contrasenia: string;
    rol: Rol;
}

export default UsuarioDTO;