import express from "express";
import {
    register,
    getList,
    searchById,
    deleteUser,
    login,
} from "../controllers/User.controller.js";
const userRoute = express.Router();

userRoute.get("/", getList);
userRoute.get("/:id", searchById);
userRoute.post("/register", register);
userRoute.delete("/:id", deleteUser);
userRoute.post("/login", login);

export default userRoute;
