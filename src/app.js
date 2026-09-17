import "dotenv/config"
import express from "express";
import userRoute from "./routes/User.route.js";
import morgan from "morgan";
import helmet from "helmet";
import projectRoute from "./routes/Project.route.js";
import taskRoute from "./routes/Task.route.js";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./Swagger/swaggerConfig.js";
import { globalLimiter } from "./middleware/rateLimiters.js";
import errorHandler from "./middleware/ErrorHandler.js";
import nosqlSanitizer from "./config/nosqlSanitizerConfig.js";


const app = express();


//  ==================== Middleware===================
app.use(cors());
// Disable contentSecurityPolicy in helmet so Swagger UI assets & scripts load properly
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(morgan("combined"));
app.use(express.json({limit: '10kb'})); // json
app.use(express.urlencoded({ extended: true , limit: '10kb' })); 
app.use(nosqlSanitizer);



// ===================Swagger Documentation===================
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

// ==========================Connect routes =====================================
app.use("/api/users", globalLimiter, userRoute);
app.use("/api/projects", globalLimiter, projectRoute);
app.use("/api/tasks", globalLimiter, taskRoute);

app.use(errorHandler);

export default app;