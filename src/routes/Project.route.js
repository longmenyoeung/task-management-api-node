import e from "express";
import {
    createProject,
    deleteProject,
    getListProject,
    updateProject,
} from "../controllers/Project.controller.js";
import authorizeRoles from "../middleware/Authorizerole.js";
const projectRoute = e.Router();

projectRoute.get("/",authorizeRoles("admin"), getListProject);
projectRoute.post("/",createProject);
projectRoute.put("/:id",authorizeRoles("admin"), updateProject);
projectRoute.delete('/:id',authorizeRoles("admin"),deleteProject);

export default projectRoute;
