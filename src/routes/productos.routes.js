import { Router } from "express";
import {
	getProductos,
	agregarProducto,
	actualizarProducto,
	borrarProducto,
} from "../controllers/productos.controller.js";

const productosRouter = Router();

productosRouter.get("/", getProductos);
productosRouter.post("/", agregarProducto);
productosRouter.put("/:id", actualizarProducto);
productosRouter.delete("/:id", borrarProducto);

export default productosRouter;