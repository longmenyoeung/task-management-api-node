import e from "express";
import { 
    createTask, 
    deleteTask, 
    getListTask, 
    updateTask
} from "../controllers/Task.controller.js";
const taskRoute = e.Router();



taskRoute.get('/', getListTask);
taskRoute.post('/:id/create', createTask);
taskRoute.put('/:id', updateTask);
taskRoute.delete("/:id", deleteTask);


export default taskRoute;