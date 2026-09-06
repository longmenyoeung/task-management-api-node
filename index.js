import pkg from 'dotenv/config.js';
import express from "express";
import connectDB from "./src/config/db.js";
import userRoute from "./src/routes/User.route.js";
import morgan from "morgan";
import helmet from "helmet";
import projectRoute from './src/routes/project.route.js';
import taskRoute from './src/routes/Task.route.js';

const app = express();
//PORT
const port = process.env.PORT1 || process.env.PORT2;


//Middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json()); //json
app.use(express.urlencoded({ extended: true }));

//connect db
connectDB();

//router
app.use('/api/users', userRoute);
app.use('/api/projects', projectRoute);
app.use('/api/tasks', taskRoute);


app.listen(port, () => {
    console.log(`Server runnig on http://localhost:${port}`);
});