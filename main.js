// Crear el servidor express
const express = require("express");
const server = express();
const { PORT, JWT_Secret, JWT_AdminSecret } = require("./config/config");
// Connection asincrona (anteriormente devolvia una promise)
const { connect } = require("./db/db_atlas");
connect();
// Middlewares para utilizar los json en el body
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
//Configuracion para utilizar los tokens de JWT
server.set("secretKey", JWT_Secret);
server.set("secretAdminKey", JWT_AdminSecret);
// Configuracion de los Heades de las respuestas
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
//Middleware para configuracion cors
const cors = require("cors");
server.use(cors());
// Middleware para logear las peticiones
//const logger = require("morgan");
//server.use(logger("dev"));
// Middleware enrutador
const usersRouter = require("./routers/users.router");
const productsRouter = require("./routers/products.router");
const productParts = require("./routers/productParts.router");
const promosRouter = require("./routers/promos.router");
const commentsRouter = require("./routers/comments.router");
const cartRouter = require("./routers/cart.router");
const modelRouter = require("./routers/model.router");
server.use("/users", usersRouter);
server.use("/prducts", productsRouter);
server.use("/productParts", productParts);
server.use("/promos", promosRouter);
server.use("/comments", commentsRouter);
server.use("/cart", cartRouter);
server.use("/models", modelRouter);
server.use("/forge", callbackForgeRouter);
// Middleware de enrutado para rutas no existentes (tambien se le puede omitir el primer argumento?)
const HTTPSTATUSCODE = require("./utils/httpStatusCode");
server.use("*", (req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  error.message = HTTPSTATUSCODE[404];
  next(error);
});
// Manejador/Middleware de errores, siempre se define con los 4 parametros (err, req, res, next)
server.use((error, req, res, next) => {
  console.error("[ERROR] Ha ocurrido un error", error.status, error.message);
  res
    .status(error.status || 500)
    .json(error.message || "Ha ocurrido un error en el servidor");
});
// Evitar que se sepa que la api rest está montada con node + express
server.disable("x-powered-by");
server.listen(PORT, () =>
  console.log(`Servidor levantado en el puerto ${PORT}`)
);
