import express, { Request, Response, Application } from "express";
import { Client } from "minio";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import profileRouter from "./routes/profileRoutes";
import followerRouter from "./routes/followerRoutes";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import { createProxyMiddleware, Options } from "http-proxy-middleware";

dotenv.config();
export const NODE_ENV = process.env.NODE_ENV || "dev";
const app = express();
const port = process.env.PORT;
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    exposedHeaders: ["Authorization", "Refresh-Token"],
  })
);

// minIO config
const minioEndpoint = process.env.MINIO_ENDPOINT || "localhost";
const minioPort = parseInt(process.env.MINIO_PORT || "9000");
export const minIOUrl = `http://${minioEndpoint}:${minioPort}`;

console.log(`Connecting to MinIO at ${minioEndpoint}:${minioPort}`);

export const minioClient = new Client({
  endPoint: minioEndpoint,
  port: minioPort,
  useSSL: false,
  accessKey: process.env.MINIO_USER || "",
  secretKey: process.env.MINIO_PASSWORD || "",
});
//swagger configuration
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { deleteExpiredTokens } from "./tasks/deleteTokens";
import feedRouter from "./routes/feedRoutes";
import path from "path";

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
        url: `http://localhost:${port}`,
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

// remove old tokens every ten minutes
setInterval(
  () => {
    console.log("Deleting old tokens");
    deleteExpiredTokens();
  },
  10 * 60 * 1000
);
app.use(bodyParser.json());
app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/profile", profileRouter);
app.use("/api/feed", feedRouter);
app.use("/api/follower/", followerRouter);
const minioProxyOptions: Options = {
  target: minIOUrl,
  changeOrigin: true,
  pathRewrite: {
    "^/media": "/",
  },
};
app.use("/media/", createProxyMiddleware(minioProxyOptions));
// In production builds, NODE_ENV will be "production"
console.log(NODE_ENV);
if (process.env.NODE_ENV === "production") {
  // serve frontend
  const publicDir = path.join(__dirname, "../public/");
  console.log(publicDir);
  app.use(express.static(publicDir));

  app.get(/.*/, (req, res) => {
    const indexPath = path.join(publicDir, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath); // Using absolute path created with path.join
    } else {
      res.status(404).send("Frontend build not found");
    }
  });
}

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
