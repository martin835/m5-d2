import express from "express";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./services/authors/index.js";
import articlesRouter from "./services/articles/index.js";
import cors from "cors";
import {
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./errorHandlers.js";

console.log(process.cwd());

const server = express();
const port = 3001;
// *********************************** MIDDLEWARES ***********************************

server.use(cors());
server.use(express.json());

// *********************************** ENDPOINTS *************************************
server.use("/authors", authorsRouter);
server.use("/articles", articlesRouter);

// ********************************** ERROR HANDLERS *********************************

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
