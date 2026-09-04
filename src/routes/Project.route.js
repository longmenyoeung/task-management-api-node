import e from "express";
import { createProject, getListProject } from "../controllers/Project.controller.js";
const projectRoute = e.Router();



projectRoute.post('/', createProject);
projectRoute.get('/', getListProject);




export default projectRoute;