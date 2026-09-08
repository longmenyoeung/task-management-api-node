import e from "express";
import { 
    createTask, 
    getListTask, 
    updateTask
} from "../controllers/Task.controller.js";
const taskRoute = e.Router();



taskRoute.get('/', getListTask);
taskRoute.post('/:id/create', createTask);
taskRoute.put('/:id', updateTask);


export default taskRoute;