import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


export class File{
    constructor(file){
        this.file = `${__dirname}/${file}`
    }
    //TODO: Volver a poner asincronia a esto
    read(){
        try{
            const productos = fs.readFileSync(this.file, 'utf-8');
            return JSON.parse(productos);
        } catch (err){
            console.log(err);
            return [];
        }
    }
    //TODO: Volver a poner asincronia a esto
    create(producto){
        const productos = this.read();
        producto.id = productos.length + 1;
        productos.push(producto);
        try{
            fs.writeFile(this.file, JSON.stringify(productos, null, '\t'));
            return producto;
        }
        catch (err){
            console.log(err);
            return err;
        }
    }

    async update(title, price, thumbnail, index){
        let productos = await this.fs.promises.readFile(this.file, 'utf-8');
        let productosParse = JSON.parse(productos);
        productosParse[index].title=title;
        productosParse[index].price=price;
        productosParse[index].thumbnail=thumbnail;   
        try{
            await this.fs.promises.writeFile(this.file, JSON.stringify(productosParse, null, '\t'));
            return "El producto se actualizo correctamente";
        }
        catch (err){
            console.log(err);
            return err;
        }
    }

    async delete(productId, index){
        const productos = await this.read();
        if (productos[index].id = productId) {
            productos.splice(1,index)
        }
        try{
            await this.fs.promises.writeFile(this.file, JSON.stringify(productos, null, '\t'));
            return producto;
        }
        catch (err){
            console.log(err);
            return err;
        } 
    }
}

export default new File('productos.txt');