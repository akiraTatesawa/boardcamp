import "./config/config.js";

import express from "express";
import cors from "cors";
import chalk from "chalk";

// Routers
import { categoriesRouter } from "./routes/categoriesRouter.js";
import { gamesRouter } from "./routes/gamesRouter.js";
import { customersRouter } from "./routes/customersRouter.js";
import { rentalsRouter } from "./routes/rentalsRouter.js";

const server = express();

server.use(express.json());
server.use(cors());

server.use(categoriesRouter);
server.use(gamesRouter);
server.use(customersRouter);
server.use(rentalsRouter);

server.listen(process.env.PORT, () => {
  console.log(
    chalk.bgGreen.black.bold(`Server running on port ${process.env.PORT}`)
  );
});
