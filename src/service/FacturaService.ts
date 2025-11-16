import FacturaRepository from "../repository/FacturaRepository";
import Factura, { EstadoFactura, TipoFactura } from "../model/Factura";
import RemitoService from "./RemitoService";
import FacturaDto from "../model/DTO/FacturaDto";
import EventoService from "./EventoService";
import AuditoriaFacturaService from "./AuditoriaFacturaService";
import UsuarioRepository from "../repository/UsuarioRepository";
import RemitoRepository from "../repository/RemitoRepository";

const listarFactura = async () => {
  return await FacturaRepository.findall();
};
//------------------------------------------------------------------------------------------------
const obtenerFactura = async (id: string) => {
  return await FacturaRepository.findById(id);
};

//------------------------------------------------------------------------------------------------
export const formatearFacturaParaAuditoria = (factura: FacturaDto) => {
  const {numero_factura,tipo_factura,empresa,importe,recibido_por,estado,fecha,} = factura;

  const recibidoFormateado = recibido_por
    ? {
        nombre: recibido_por.nombre,
        tipo_persona: recibido_por.tipo_persona,
      }
    : null;

  return {numero_factura,tipo_factura,empresa,importe,recibido_por: recibidoFormateado,estado,fecha,};
};


//------------------------------------------------------------------------------------------------
const validarFecha = (fecha: Date) => {
  const fechaValida = new Date(fecha);
  const hoy = new Date();
  const fechaMinima = new Date("2000-01-01");

  if (isNaN(fechaValida.getTime())) {
    throw new Error("Fecha inválida");
  }

  if (fechaValida > hoy) {
    throw new Error("La fecha no puede ser futura");
  }

  if (fechaValida < fechaMinima) {
    throw new Error("Fecha demasiado antigua");
  }

  return fechaValida;
};



//------------------------------------------------------------------------------------------------

const crearFactura = async (facturadto: FacturaDto, firebaseUid: string) => {
  const existe = await FacturaRepository.findByNumero(facturadto.numero_factura);
  if (existe) {
    throw new Error(`Ya existe una factura con el número ${facturadto.numero_factura}`);
  }
     if (facturadto.fecha) {
    facturadto.fecha = validarFecha(facturadto.fecha);
  } else {
    facturadto.fecha = new Date(); 
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
if (!facturaCompleta) {
  throw new Error("No se pudo obtener la factura completa después de crearla");
}
const facturaFormateada = formatearFacturaParaAuditoria(facturaCompleta);


  if (nuevaFactura._id) {
    await AuditoriaFacturaService.registrarAuditoria({
      id_factura: nuevaFactura._id.toString(),
      id_usuario:usuario._id.toString(), 
      numero_factura: nuevaFactura.numero_factura, 
      nombre_usuario: usuario.nombre,
      campo_modificado: "CREACIÓN",
      valor_anterior: "-",
      valor_nuevo: JSON.stringify(facturaFormateada),
      descripcion: `Se creó la factura número ${nuevaFactura.numero_factura} por ${usuario.nombre}`,
    });
  }

  return nuevaFactura;
};

//------------------------------------------------------------------------------------------------
const actualizarFactura = async (id: string, facturadto: Partial<FacturaDto>, firebaseUid: string) => {
 const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);

 if (!usuario || !usuario._id){
  throw new Error ("Usuario no encontrado en base de datos");
 }
  const facturaExistente = await FacturaRepository.findById(id);
  if (!facturaExistente) {
    throw new Error("Factura no encontrada");
  }
 
  if (facturadto.fecha) {
    facturadto.fecha = validarFecha(facturadto.fecha);
  }

  if (facturadto.numero_remito &&facturadto.numero_remito !== facturaExistente.numero_remito) {
    return await reasociarRemitoAFactura(id, facturadto.numero_remito, firebaseUid);
  }

  const facturaActualizada = await FacturaRepository.update(id, facturadto);
  if (!facturaActualizada || !facturaActualizada._id) {
    throw new Error("Error al actualizar la factura");
  }
  
  if(!facturaActualizada  || !facturaActualizada._id){
    throw new Error ("Error al actualizar la factura")
  }

  const valorAnterior= { 
    tipo_factura: facturaExistente.tipo_factura !== facturaActualizada.tipo_factura ? facturaExistente.tipo_factura : "-",
    empresa: facturaExistente.empresa !== facturaActualizada.empresa ? facturaExistente.empresa : "-", 
    importe: facturaExistente.importe !== facturaActualizada.importe ? facturaExistente.importe : "-",
    fecha: facturaExistente.fecha?.toString() !== facturaActualizada.fecha?.toString() ? facturaExistente.fecha: "-"};

  const valorNuevo = {
  tipo_factura: facturaExistente.tipo_factura !== facturaActualizada.tipo_factura ? facturaActualizada.tipo_factura : "-",
  empresa: facturaExistente.empresa !== facturaActualizada.empresa ? facturaActualizada.empresa : "-",
  importe: facturaExistente.importe !== facturaActualizada.importe ? facturaActualizada.importe : "-" ,
   fecha: facturaExistente.fecha?.toString() !== facturaActualizada.fecha?.toString() ? facturaActualizada.fecha: "-"};


  await AuditoriaFacturaService.registrarAuditoria({
    id_factura: facturaActualizada._id.toString(),
    id_usuario: usuario._id.toString(),
    numero_factura: facturaActualizada.numero_factura,
    nombre_usuario: usuario.nombre,
    campo_modificado: "ACTUALIZACIÓN",
    valor_anterior: JSON.stringify(valorAnterior),
    valor_nuevo: JSON.stringify(valorNuevo),
    descripcion: `Factura ${facturaActualizada.numero_factura} actualizada por ${usuario.nombre}`,
  });
   return facturaActualizada;
};


//------------------------------------------------------------------------------------------------
const borrarFactura = async (id: string, firebaseUid: string) => {
 const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);
  if (!usuario || !usuario._id) throw new Error("Usuario no encontrado");

  const facturaExistente = await FacturaRepository.findById(id);
  if (!facturaExistente) {
  throw new Error("No se pudo obtener la factura existente");
}
  const facturaFormateada = formatearFacturaParaAuditoria(facturaExistente);

  if (!facturaExistente) throw new Error("Factura no encontrada");

  await AuditoriaFacturaService.registrarAuditoria({
    id_factura: id,
    id_usuario: usuario._id.toString(),
    numero_factura: facturaExistente.numero_factura,
    nombre_usuario: usuario.nombre,
    campo_modificado: "ELIMINACIÓN",
    valor_anterior: JSON.stringify(facturaFormateada),
    valor_nuevo: "-",
    descripcion: `Factura ${facturaExistente.numero_factura} eliminada por ${usuario.nombre}`,
  });

  await FacturaRepository.remove(id);

  return facturaExistente;
};

//------------------------------------------------------------------------------------------------
const obtenerPorNumero = async (numero: number) => {
  return await FacturaRepository.findByNumero(numero);
};

//------------------------------------------------------------------------------------------------
const obtenerPorRemito = async (numero_remito: number) => {
  return await FacturaRepository.findByRemito(numero_remito);
};

//------------------------------------------------------------------------------------------------
const asociarRemitoAFactura = async (id: string, numero_remito: number, firebaseUid:string) => {
  const remito = await RemitoService.obtenerPorNumero(numero_remito);
  if (!remito) {
    throw new Error("El remito no existe");
  }

  const existe = await FacturaRepository.findByRemito(numero_remito);
  if (existe) throw new Error("El remito ya está asociado a otra factura");

  const facturaExistente = await FacturaRepository.findById(id);
  if (!facturaExistente) throw new Error("No se encontró la factura para actualizar");

  if (facturaExistente.numero_remito) {
  throw new Error("La factura ya tiene un remito asociado");
}


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
    numero_factura: facturaActualizada.numero_factura,
    nombre_usuario: usuario.nombre,
    campo_modificado: "ASOCIAR REMITO",
    valor_anterior: JSON.stringify({numero_remito: "-", estado: facturaExistente.estado,}),
    valor_nuevo: JSON.stringify({numero_remito: facturaActualizada.numero_remito, estado: facturaActualizada.estado}),
    descripcion: `Se asoció el remito ${numero_remito} a la factura ${facturaActualizada.numero_factura} por ${usuario.nombre}`
  });

  return await FacturaRepository.findById(facturaActualizada._id.toString());
};

//------------------------------------------------------------------------------------------------
const reporteMensualFacturas = async () => {
  return await FacturaRepository.reporteMensual();
}
//-------------------------------------------------------------------------------------------------------------------------------
const reasociarRemitoAFactura = async (facturaId: string,nuevoRemitoNumero: number,firebaseUid: string) => {
  const factura = await FacturaRepository.findById(facturaId);
  if (!factura) throw new Error("Factura no encontrada");

  const nuevoRemito = await RemitoService.obtenerPorNumero(nuevoRemitoNumero);
  if (!nuevoRemito) throw new Error("Remito no encontrado");


  const facturaActualizada = await FacturaRepository.update(facturaId, {
    numero_remito: nuevoRemitoNumero,
    estado: EstadoFactura.IMPUTADA,
  });
 
  if (factura.numero_remito) {
    await RemitoService.actualizarEstado(factura.numero_remito);
  }
  await RemitoService.actualizarEstado(nuevoRemitoNumero); 
  const usuario = await UsuarioRepository.findByFirebaseUid(firebaseUid);
  if (!usuario || !usuario._id) throw new Error("Usuario no encontrado");
  
    if (!facturaActualizada || !facturaActualizada._id) {
    throw new Error("No se encontró la factura para actualizar");
  }

  await AuditoriaFacturaService.registrarAuditoria({
    id_factura: facturaActualizada._id.toString(),
    id_usuario: usuario._id.toString(),
    numero_factura: facturaActualizada.numero_factura,
    nombre_usuario: usuario.nombre,
    campo_modificado: "REASOCIAR REMITO",
    valor_anterior: JSON.stringify({numero_remito: factura.numero_remito,estado: factura.estado,}),
    valor_nuevo: JSON.stringify({numero_remito: facturaActualizada.numero_remito,estado: facturaActualizada.estado,}),
    descripcion: `Se reasoció la factura ${facturaActualizada.numero_factura} del remito ${factura.numero_remito} al remito ${nuevoRemitoNumero} por ${usuario.nombre}`,
  });

  return facturaActualizada;
};

export default { listarFactura,obtenerFactura,crearFactura,actualizarFactura,borrarFactura, obtenerPorNumero, obtenerPorRemito, asociarRemitoAFactura, reporteMensualFacturas};