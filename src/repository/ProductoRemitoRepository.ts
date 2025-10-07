import { ProductoRemitoModel } from "../schema/ProductoRemito";
import ProductoRemito from "../model/ProductoRemito";

const create = async (productoRemito : ProductoRemito)=> {
    return await ProductoRemitoModel.create(productoRemito);
};

const findByRemito = async (id_remito: string) => {
    return await ProductoRemitoModel.find({id_remito}).populate("id_producto");
};

export default {create, findByRemito}; 