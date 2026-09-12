import pkg from "dotenv/config.js";
import express from "express";
import connectDB from "./src/config/db.js";
import userRoute from "./src/routes/User.route.js";
import morgan from "morgan";
import helmet from "helmet";
import projectRoute from "./src/routes/Project.route.js";
import taskRoute from "./src/routes/Task.route.js";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./src/Swagger/swaggerConfig.js";
import { notFound } from "./src/utils/ErrorMessage.js";
import errorHandler from "./src/middleware/ErrorHandler.js";

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

// Redirect root to Swagger documentation
app.get("/", (req, res) => {
    res.redirect("/api/docs");
});

// Raw OpenAPI JSON spec endpoint
app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

// Connect routes
app.use("/api/users", userRoute);
app.use("/api/projects",  projectRoute);
app.use("/api/tasks", taskRoute);





//Fallback for unhandled endpoints
// app.use((req, res, next) => {
//     next(new notFound(`Can't find ${req.originalUrl} on this server!`));
// });

// Global error hadling middleware MUST be placed last
// app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
});

