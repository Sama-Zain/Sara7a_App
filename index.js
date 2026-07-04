import express from "express";
import bootstrap from "./Src/app.controller.js";
import chalk from "chalk";
import { PORT } from "./Config/config.service.js";
const port = PORT;
const app = express();
await bootstrap(app, express);
app.listen(port, () => {
  console.log(chalk.bgCyan.bold.white(`Server is running on port ${port}`));
});



