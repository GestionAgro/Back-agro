import Rol from "./Rol";

interface Usuario {
    _id?: string;
    nombre: string;
    email: string;
    contrasenia: string;
    rol: Rol;
}

export default Usuario;