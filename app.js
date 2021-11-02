import Express from "express";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.js";
import productosRouter from "./src/routes/productos.routes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import archivo from "./src/models/archivo.js";

const app = Express();
const server = createServer(app);
const io = new Server(server);

app.use(Express.static("src/public"));

app.use(Express.json());
app.use("/productos", productosRouter);
app.use(errorHandlerMiddleware);

server.listen(3000, () => {
  console.log("Server WebSockets listening on port 3000");
});


let listaProductos = archivo.read();
let notificaciones = []

io.on("connection", (socket) => {
  console.log("Usuario conectado");
  socket.emit("lista", listaProductos);
  socket.on("newProducto", (producto) => {
  producto.id = listaProductos.length + 1;
  listaProductos.push(producto);
  io.sockets.emit("newElement", producto);
  })
})

export default app;
