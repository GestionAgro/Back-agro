import { Request, Response } from "express";
import FacturaService from "../service/FacturaService";

export const listarFactura = async (req: Request, res: Response) => {
  try {
    const factura = await FacturaService.listarFactura();
    res.status(200).json(factura);
  }catch (error) {
  res.status(500).json({ error: "Error al listar facturas" });
}
};

export const obtenerFactura = async (req: Request, res: Response) => {
  try {
    const factura = await FacturaService.obtenerFactura(req.params.id);
    if (!factura) {
      res.status(404).json({ error: "Remito no encontrado" });
      return;
    } 
    res.status(200).json(factura);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener factura" });
  }
};

export const crearFactura= async (req: Request, res: Response) => {
  try {
    const uid = res.locals.user?.uid;
    const nuevo = await FacturaService.crearFactura(req.body, uid);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({error: "Error al crear factura"});
  }
};

export const actualizarFactura = async (req: Request, res: Response) => {
  try {
     const uid = res.locals.user?.uid;
     const {id} = req.params;
    const actualizado = await FacturaService.actualizarFactura(id, req.body, uid);
    if (!actualizado) {
      res.status(404).json({ error: "Factura no encontrada" });
      return;
    }
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar factura" });
  }
};


export const borrarFactura = async (req: Request, res: Response) => {
  try {
    const uid = res.locals.user?.uid;
    const {id} = req.params;
    const eliminado = await FacturaService.borrarFactura(id,uid);
    if (!eliminado) {
      res.status(404).json({ error: "Factura no encontrada" });
      return;
    }
    res.status(200).json({ error: "Factura eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar factura" });
  }
};

export const obtenerFacturaPorNumero = async (req: Request, res: Response) => {
  try {
    const numero = Number(req.params.numero); 
    const factura = await FacturaService.obtenerPorNumero(numero);

    if (!factura) {
     res.status(404).json({ error: "Factura no encontrada" });
     return;
    }
    res.status(200).json(factura);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener factura" });
  }
};

export const asociarRemitoAFactura = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const uid = res.locals.user?.uid;
    const { numero_remito } = req.body;

    const actualizada = await FacturaService.asociarRemitoAFactura(id, numero_remito, uid);
    res.status(200).json(actualizada);
  } catch (error) {
    res.status(500).json({ error:"Error al asociar remito a factura" });
  }
};

export const reporteMensualFactura = async (req: Request, res: Response) =>{
  try{
    const reporte = await FacturaService.reporteMensualFacturas();
    res.status(200).json(reporte);
  }catch (error) {
    res.status(500).json({ error: "Error al generar reporte mensual" });
  }
}

