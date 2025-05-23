import express, { Request, Response, Application } from "express";
import { Client } from "minio";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
//import postController from "./controllers/postController";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = 3000;

// minIO config
export const minioClient = new Client({
  endPoint: "localhost", // Replace with your MinIO server URL
  port: 9000, // Default MinIO port
  useSSL: false, // Set to true if using HTTPS
  accessKey: process.env.MINIO_USER, // minIO username/access key
  secretKey: process.env.MINIO_PASSWORD, // MinIO password/secret key
});
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
app.use("/api/posts", postRouter);

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
