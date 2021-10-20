import { Productos } from "../models/productos.js";
import archivo from '../models/archivo.js'


export const getProductos = async (req, res) => {
  try {
    const listaProductos = await archivo.read();
    console.log(listaProductos)
    //const listaParseada = listaProductos.json();
    //const { id } = req.params;
    // if (id) {
    //   listaParseada.find((p) => p.id == id);
    // }
    return {
      listProductos: listaProductos,
    };
  } catch (error) {
    console.log(error);
  }
};

export const agregarProducto = async (req, res) => {
  try {
    const product = await new Productos(
      req.body.title,
      req.body.price,
      req.body.thumbnail
    );
    const productOk = await File.create(product);
    if (productOk) {
      res.render("index.hbs", {
        listProductos: listaProductos,
      });
    }
  } catch (error) {
    console.log(err);
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const { title, price, thumbnail } = req.body;
    const id = req.params.id;
    const listaProductos = await File.read();
    const product = listaProductos.filter((product) => product.id == id);
    const index = listaProductos.indexOf(product[0]);
    await File.update(title, price, thumbnail, index);
    if (!product) {
      console.log("Producto no encontrado");
    } else {
      res.render("index.hbs", {
        listProductos: listaProductos,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const borrarProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const listaProductos = await File.read();
    const product = listaProductos.filter((product) => product.id == id);
    const index = listaProductos.indexOf(product[0]);
    const productDelete = await File.delete(product, index);
    if (!id) {
      console.log("error: Producto no encontrado");
    } else {
      res.render("index.hbs", {
        listProductos: listaProductos,
      });
    }
  } catch (error) {
      console.log(error)
  }
};
