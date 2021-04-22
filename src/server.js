import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";
import { join } from "path";
import filesRoutes from "./files/index.js";
import studentsRoutes from "./students/index.js";
import projectsRoutes from "./projects/index.js";
import reviewsRoutes from "./reviews/index.js";

import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  forbiddenErrorHandler,
  catchAllErrorHandler,
} from "./errorHandling.js";
import { getCurrentFolderPath } from "./lib/fs-tools.js";

const server = express();
const port = process.env.PORT;
const whitelist = [process.env.FE_URL_DEV, process.env.FE_URL_PROD];
const corsOptions = {
  origin: function (origin, next) {
    if (whitelist.indexOf(origin) !== -1) {
      console.log("ORIGIN ", origin);
      // origin found in whitelist
      next(null, true);
    } else {
      // origin not found in the whitelist
      next(new Error("Not allowed by CORS"));
    }
  },
};

server.use(cors(corsOptions));

const publicFolderPath = join(
  getCurrentFolderPath(import.meta.url),
  "../public"
);
server.use(express.static(publicFolderPath));

const swaggerDocument = YAML.load(
  join(getCurrentFolderPath(import.meta.url), "./apiDescription.yml")
);

server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

server.use(express.json());
server.use("/students", studentsRoutes);
server.use("/projects", projectsRoutes);
server.use("/files", filesRoutes);
server.use("/reviews", reviewsRoutes);

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(forbiddenErrorHandler);
server.use(catchAllErrorHandler);

console.log(listEndpoints(server));
server.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    // no need to configure it manually on Heroku
    console.log("Server running on cloud on port: ", port);
  } else {
    console.log("Server running locally on port: ", port);
  }
});
