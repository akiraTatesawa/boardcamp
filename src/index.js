import "./config/config.js";

import express from "express";
import cors from "cors";
import chalk from "chalk";

// Routers
import { categoriesRouter } from "./routes/categoriesRouter.js";

const server = express();

server.use(express.json());
server.use(cors());

server.use(categoriesRouter);

server.listen(process.env.PORT, () => {
  console.log(
    chalk.bgGreen.black.bold(`Server running on port ${process.env.PORT}`)
  );
});
