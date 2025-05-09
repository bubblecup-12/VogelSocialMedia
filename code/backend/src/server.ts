import express, { Request, Response, Application } from "express";

import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = 3000;

//swagger configuration
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "VogelApi",
      version: "0.0.1",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Optional, for documentation purposes
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply globally if needed
      },
    ],
  },
  apis: ["src/routes/*.ts"], // Hier werden alle Routen-Dateien mit Swagger-Kommentaren geladen
};
const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json());
app.use("/api/user", userRouter);
// Sample route
app.get("/api/hello", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
