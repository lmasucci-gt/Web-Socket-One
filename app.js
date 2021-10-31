import Express from "express";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.js";
import productosRouter from "./src/routes/productos.routes.js";
import handlebars from "express-handlebars";
import { createServer } from 'http';
import { Server } from "socket.io";

const app = Express();
const server = createServer(app);
const io = new Server(server);

app.use(Express.static('src/public'));

/* Configuracion motor de plantillas */
app.engine(
    "hbs",
    handlebars({
      extname: ".hbs",
      defaultLayout: "index.hbs",      
      layoutsDir: "./src/views/layouts",
      partialsDir: "./src/views/partials",
    })
  );  

app.set("views", './src/views/layouts'); // especifica el directorio de vistas
app.set("view engine", "hbs"); // registra el motor de plantillas


app.use(Express.json());

app.get("/", (_, res) => {
	return res.json({ message: "Bienvenido al root" });
});

app.use("/productos", productosRouter);
app.use(errorHandlerMiddleware);

server.listen(3000, () => {
	console.log('Server WebSockets listening on port 3000')
} )

io.on('connection', (socket) => {
  console.log('Usuario conectado');
} )

export default app
