import Express from "express";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.js";
import productosRouter from "./src/routes/productos.routes.js";
import handlebars from "express-handlebars";
const app = Express();

/* Configuracion motor de plantillas */
app.engine(
    "hbs",
    handlebars({
      extname: ".hbs",
      defaultLayout: "index.hbs",
      partialsDir: "./views/partials",
    })
  );

app.set("views", "./views"); // especifica el directorio de vistas
app.set("view engine", "hbs"); // registra el motor de plantillas

app.use(Express.json());

app.get("/", (_, res) => {
	return res.json({ message: "Bienvenido al root" });
});

app.use("/productos", productosRouter);
app.use(errorHandlerMiddleware);

export default app
