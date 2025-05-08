import express, { Request, Response } from "express";

import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
