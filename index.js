import "dotenv/config.js";
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
import { globalLimiter } from "./src/middleware/rateLimiters.js";
import errorHandler from "./src/middleware/ErrorHandler.js";
import nosqlSanitizer from "./src/config/nosqlSanitizerConfig.js";


const app = express();
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
app.use(express.json({limit: '10kb'})); // json
app.use(express.urlencoded({ extended: true , limit: '10kb' })); 
app.use(nosqlSanitizer);

 
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
app.use("/api/users", globalLimiter, userRoute);
app.use("/api/projects", globalLimiter, projectRoute);
app.use("/api/tasks", globalLimiter, taskRoute);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
});

