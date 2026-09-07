import e from "express";
import { 
    createTask, 
    getListTask 
} from "../controllers/Task.controller.js";
const taskRoute = e.Router();



taskRoute.get('/', getListTask);
taskRoute.post('/:id/create', createTask);


export default taskRoute;