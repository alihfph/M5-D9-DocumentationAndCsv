import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import { join } from "path";
import filesRoutes from "./files/index.js";
import studentsRoutes from "./students/index.js";
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  forbiddenErrorHandler,
  catchAllErrorHandler,
} from "./errorHandling.js";
import { getCurrentFolderPath } from "./lib/fs-tools.js"

const server = express();
const port = 3001;
const publicFolderPath = join(
  getCurrentFolderPath(import.meta.url),
  "../public"
);
server.use(express.static(publicFolderPath));
server.use(cors());
server.use(express.json());
server.use("/projects", studentsRoutes);
server.use("/files", filesRoutes);

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(forbiddenErrorHandler);
server.use(catchAllErrorHandler);

console.log(listEndpoints(server));
server.listen(port, () => {
  console.log("Server is running on port ", port);
});
