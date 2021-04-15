import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

import studentsRoutes from "./students/index.js";
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  forbiddenErrorHandler,
  catchAllErrorHandler,
} from "./errorHandling.js";

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());
server.use("/projects", studentsRoutes);

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(forbiddenErrorHandler);
server.use(catchAllErrorHandler);

console.log(listEndpoints(server));
server.listen(port, () => {
  console.log("Server is running on port ", port);
});
