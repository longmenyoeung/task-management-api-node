import express from "express";
import { register, getList,searchById } from "../controllers/User.controller.js";
const userRoute = express.Router();

userRoute.get('/', getList);
userRoute.get('/:id', searchById);
userRoute.post('/register', register);


export default userRoute;