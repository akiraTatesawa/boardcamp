import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.listen(process.env.PORT, () => {
  console.log(
    chalk.bgGreen.black.bold(`Server running on port ${process.env.PORT}`)
  );
});
