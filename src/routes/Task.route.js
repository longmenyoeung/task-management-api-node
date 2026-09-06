import e from "express";
import { getListTask } from "../controllers/Task.controller.js";
const taskRoute = e.Router();



taskRoute.get('/', getListTask);


export default taskRoute;