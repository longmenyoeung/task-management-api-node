import e from "express";
import {
    createProject,
    deleteProject,
    getListProject,
    updateProject,
} from "../controllers/Project.controller.js";
const projectRoute = e.Router();

projectRoute.post("/", createProject);
projectRoute.get("/", getListProject);
projectRoute.put("/:id", updateProject);
projectRoute.delete('/:id', deleteProject);

export default projectRoute;
