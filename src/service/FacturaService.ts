import FacturaRepository from "../repository/FacturaRepository";
import Factura, { EstadoFactura } from "../model/Factura";
import RemitoService from "./RemitoService";
import FacturaDto from "../model/DTO/FacturaDto";

const listarFactura = async () => {
  return await FacturaRepository.findall();
};

const obtenerFactura = async (id: string) => {
  return await FacturaRepository.findById(id);
};

const crearFactura = async (factura: Factura) => {
  const existe = await FacturaRepository.findByNumero(factura.numero_factura);
  if (existe) {
    throw new Error(`Ya existe una factura con el número ${factura.numero_factura}`);
  }
  return await FacturaRepository.create(factura);
};


const actualizarFactura = async (id: string, factura: Partial<Factura>) => {
  return await FacturaRepository.update(id, factura);
};

const borrarFactura = async (id: string) => {
  return await FacturaRepository.remove(id);
};

const obtenerPorNumero = async (numero: number) => {
  return await FacturaRepository.findByNumero(numero);
};

const obtenerPorRemito = async (numero_remito: number) => {
  return await FacturaRepository.findByRemito(numero_remito);
};

const asociarRemitoAFactura = async (id: string, numero_remito: number) => {
  const remito = await RemitoService.obtenerPorNumero(numero_remito);
  if (!remito) {
    throw new Error("El remito no existe");
  }

  const existe = await FacturaRepository.findByRemito(numero_remito);
  if (existe) throw new Error("El remito ya está asociado a otra factura");


  const facturaActualizada = await FacturaRepository.update(id, {
    numero_remito,
    estado: EstadoFactura.IMPUTADA
  });

  if (!facturaActualizada) {
    throw new Error("No se encontró la factura para actualizar");
  }
  await RemitoService.actualizarEstado(numero_remito);

  return await FacturaRepository.findById(facturaActualizada._id.toString()); 
};


export default { listarFactura,obtenerFactura,crearFactura,actualizarFactura,borrarFactura, obtenerPorNumero, obtenerPorRemito, asociarRemitoAFactura };