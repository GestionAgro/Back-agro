import FacturaRepository from "../repository/FacturaRepository";
import Factura, { EstadoFactura } from "../model/Factura";
import RemitoService from "./RemitoService";
import FacturaDto from "../model/DTO/FacturaDto";
import EventoService from "./EventoService";
import AuditoriaFacturaService from "./AuditoriaFacturaService";
import UsuarioRepository from "../repository/UsuarioRepository";

const listarFactura = async () => {
  return await FacturaRepository.findall();
};

const obtenerFactura = async (id: string) => {
  return await FacturaRepository.findById(id);
};

const crearFactura = async (facturadto: FacturaDto, firebaseUid: string) => {
  const existe = await FacturaRepository.findByNumero(facturadto.numero_factura);
  if (existe) {
    throw new Error(`Ya existe una factura con el número ${facturadto.numero_factura}`);
  }
  const nuevaFactura = await FacturaRepository.create(facturadto);

  if (nuevaFactura._id) { 
    await EventoService.crearEvento({
      id_persona: facturadto.recibido_por.toString(), 
      fechaYhora: new Date(),
      tipo_operacion: "CREACIÓN",
      entidad_afectada: "Factura",
      id_entidad: nuevaFactura._id.toString(),
      descripcion: `Se creó una nueva factura de ${facturadto.empresa}`
    });
  }
   
   const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);
    
   if (!usuario || !usuario._id) {
  throw new Error("Usuario no encontrado o inválido");
}
  if (!nuevaFactura._id) {
  throw new Error("No se pudo obtener el ID de la factura recién creada");
}

const facturaCompleta = await FacturaRepository.findById(nuevaFactura._id); 


  if (nuevaFactura._id) {
    await AuditoriaFacturaService.registrarAuditoria({
      id_factura: nuevaFactura._id.toString(),
       id_usuario:usuario._id.toString(), 
      campo_modificado: "CREACIÓN",
      valor_anterior: "-",
      valor_nuevo: JSON.stringify(facturaCompleta),
      descripcion: `Se creó la factura número ${nuevaFactura.numero_factura} por ${usuario.nombre}`,
    });
  }

  return nuevaFactura;
};


const actualizarFactura = async (id: string, facturadto: Partial<FacturaDto>, firebaseUid: string) => {
 const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);

 if (!usuario || !usuario._id){
  throw new Error ("Usuario no encontrado en base de datos");
 }
  const facturaExistente = await FacturaRepository.findById(id);
  if (!facturaExistente) {
    throw new Error("Factura no encontrada");
  }
 const facturaActualizada = await FacturaRepository.update(id, facturadto);
  
  if(!facturaActualizada  || !facturaActualizada._id){
    throw new Error ("Error al actualizar la factura")
  }

  await AuditoriaFacturaService.registrarAuditoria({
    id_factura: facturaActualizada._id.toString(),
    id_usuario: usuario._id.toString(),
    campo_modificado: "ACTUALIZACIÓN",
    valor_anterior: JSON.stringify(facturaExistente),
    valor_nuevo: JSON.stringify(facturaActualizada),
    descripcion: `Factura ${facturaActualizada.numero_factura} actualizada por ${usuario.nombre}`,
  });
   return facturaActualizada;
};

const borrarFactura = async (id: string, firebaseUid: string) => {
 const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);
  if (!usuario || !usuario._id) throw new Error("Usuario no encontrado");

  const facturaExistente = await FacturaRepository.findById(id);
  if (!facturaExistente) throw new Error("Factura no encontrada");

  await FacturaRepository.remove(id);
  await AuditoriaFacturaService.registrarAuditoria({
    id_factura: id,
    id_usuario: usuario._id.toString(),
    campo_modificado: "ELIMINACIÓN",
    valor_anterior: JSON.stringify(facturaExistente),
    valor_nuevo: "-",
    descripcion: `Factura ${facturaExistente.numero_factura} eliminada por ${usuario.nombre}`,
  });

  return facturaExistente;
};

const obtenerPorNumero = async (numero: number) => {
  return await FacturaRepository.findByNumero(numero);
};

const obtenerPorRemito = async (numero_remito: number) => {
  return await FacturaRepository.findByRemito(numero_remito);
};

const asociarRemitoAFactura = async (id: string, numero_remito: number, firebaseUid:string) => {
  const remito = await RemitoService.obtenerPorNumero(numero_remito);
  if (!remito) {
    throw new Error("El remito no existe");
  }

  const existe = await FacturaRepository.findByRemito(numero_remito);
  if (existe) throw new Error("El remito ya está asociado a otra factura");

  const facturaExistente = await FacturaRepository.findById(id);
  if (!facturaExistente) throw new Error("No se encontró la factura para actualizar");

  const facturaActualizada = await FacturaRepository.update(id, {
    numero_remito,
    estado: EstadoFactura.IMPUTADA
  });

  if (!facturaActualizada || !facturaActualizada._id) {
    throw new Error("No se encontró la factura para actualizar");
  }

  const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);
  if (!usuario || !usuario._id) throw new Error("Usuario no encontrado");


  await RemitoService.actualizarEstado(numero_remito);
  await AuditoriaFacturaService.registrarAuditoria({
    id_factura: facturaActualizada._id.toString(),
    id_usuario: usuario._id.toString(),
    campo_modificado: "ASOCIAR REMITO",
    valor_anterior: JSON.stringify(facturaExistente),
    valor_nuevo: JSON.stringify(facturaActualizada),
    descripcion: `Se asoció el remito ${numero_remito} a la factura ${facturaActualizada.numero_factura} por ${usuario.nombre}`
  });

  return await FacturaRepository.findById(facturaActualizada._id.toString());
};


export default { listarFactura,obtenerFactura,crearFactura,actualizarFactura,borrarFactura, obtenerPorNumero, obtenerPorRemito, asociarRemitoAFactura };