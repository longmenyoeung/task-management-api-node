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
projectRoute.post("/",authorizeRoles("admin"),createProject);
projectRoute.put("/:id", updateProject);
projectRoute.delete('/:id', deleteProject);

export default projectRoute;
