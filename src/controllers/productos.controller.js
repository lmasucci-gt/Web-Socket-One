import { Productos } from "../models/productos.js"
import { File } from "../models/archivo.js"

export const getProductos = (req, res) => {
    const listaProductos = File.read();
    const listaParseada = listaProductos.json();
    const { id } = req.query;
    if (id) {
        (listaParseada.find((p) => p.id == id));
    }
	res.render('index.hbs', {
        listProductos: listaParseada,
    })
}

export const agregarProducto = async (req, res) => {
    try {
        const product = await new Productos(
            req.body.title,
            req.body.price,
            req.body.thumbnail
          );
        const productOk = await File.create(product)
    if(productOk){
        res.render('index.hbs', {
            listProductos: listaProductos,
        })
     }
    } catch (error) {
        console.log(err);
    }   
}

export const actualizarProducto = async (req, res) => {
    const { title, price, thumbnail } = req.body;
    const id = req.params.id;
    const listaProductos = await File.read();
    const product = listaProductos.filter((product) => product.id == id);
    const index = listaProductos.indexOf(product[0]);
    await File.update(title, price, thumbnail, index)
    if (!product) {
        console.log("Producto no encontrado")
    } else {
        res.render('index.hbs', {
            listProductos: listaProductos,
        })
    }
}  

export const borrarProducto = async (req, res) => {
    const id = req.params.id;
    const listaProductos = await File.read();
    const product = listaProductos.filter((product) => product.id == id);
    const index = listaProductos.indexOf(product[0]);
    const productDelete = await File.delete(product, index);
    if (!id) {
      console.log ("error: Producto no encontrado");
    } else {      
        res.render('index.hbs', {
            listProductos: listaProductos,
        })
    }
}
  
 