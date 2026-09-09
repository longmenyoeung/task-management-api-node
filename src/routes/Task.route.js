import e from "express";
import { 
    createTask, 
    deleteTask, 
    getListTask, 
    updateTask
} from "../controllers/Task.controller.js";
import authorizeRoles from "../middleware/Authorizerole.js";
const taskRoute = e.Router();



taskRoute.get('/', getListTask);
taskRoute.post('/:id/create', createTask);
taskRoute.put('/:id',authorizeRoles("admin"), updateTask);
taskRoute.delete("/:id",authorizeRoles("admin"), deleteTask);


export default taskRoute;