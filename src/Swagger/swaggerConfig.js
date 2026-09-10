import swaggerJsdoc from 'swagger-jsdoc';

const port = process.env.PORT1 || process.env.PORT2 || 5000;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management System API",
            version: "1.0.0",
            description: "API documentation for the Express.js Task Management backend",
        },
        servers: [
            {
                url: "/",
                description: "Current Host (Auto-detects Localhost or Deployed Domain)",
            },
            {
                url: `http://localhost:${port}`,
                description: "Local development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Enter your JWT token to authorize requests (e.g. from /api/users/login)",
                },
            },
        },
    },
    apis: [
        "./src/routes/*.js",
        "./src/routes/**/*.js"
    ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;