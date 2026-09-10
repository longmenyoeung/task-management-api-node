import pkg from "dotenv/config.js";
import express from "express";
import connectDB from "./src/config/db.js";
import userRoute from "./src/routes/User.route.js";
import morgan from "morgan";
import helmet from "helmet";
import projectRoute from "./src/routes/Project.route.js";
import taskRoute from "./src/routes/Task.route.js";
import { AuthenticateJWT } from "./src/middleware/AuthMiddleware.js";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./src/Swagger/swaggerConfig.js";

const app = express();
// PORT (process.env.PORT is required by cloud hosts like Render, Railway, etc.)
const port = process.env.PORT || process.env.PORT1 || process.env.PORT2 || 5000;

// Middleware
app.use(cors());
// Disable contentSecurityPolicy in helmet so Swagger UI assets & scripts load properly
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(morgan("combined"));
app.use(express.json()); // json
app.use(express.urlencoded({ extended: true }));

// Connect db
connectDB();

// Swagger Documentation
app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customSiteTitle: "Task Management API Docs",
    })
);

// Raw OpenAPI JSON spec endpoint
app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

// Connect routes
app.use("/api/users", userRoute);
app.use("/api/projects", AuthenticateJWT, projectRoute);
app.use("/api/tasks", AuthenticateJWT, taskRoute);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
});

