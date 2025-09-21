import RemitoRepository from "../repository/RemitoRepository";
import Remito, { EstadoRemito } from "../model/Remito";

const listarRemitos = async () => {
  return await RemitoRepository.findall();
};

const obtenerRemito = async (id: string) => {
  return await RemitoRepository.findById(id);
};

const crearRemito = async (remito: Remito) => {
  return await RemitoRepository.create(remito);
};

const actualizarRemito = async (id: string, remito: Partial<Remito>) => {
  return await RemitoRepository.update(id, remito);
};

const borrarRemito = async (id: string) => {
  return await RemitoRepository.remove(id);
};

const obtenerPorNumero = async (numero: number): Promise<Remito | null> => {
  return await RemitoRepository.findByNumero(numero);
};

const actualizarEstado = async (numero_remito: number) => {
  return await RemitoRepository.updateByNumero(numero_remito, {
    estado: EstadoRemito.FACTURADO
  });
};

export default { listarRemitos, obtenerRemito, crearRemito, actualizarRemito, borrarRemito, obtenerPorNumero, actualizarEstado};
