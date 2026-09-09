import express from "express";
import {
    register,
    getList,
    searchById,
    deleteUser,
    login,
} from "../controllers/User.controller.js";
import authorizeRoles from "../middleware/Authorizerole.js";
const userRoute = express.Router();

userRoute.get("/",authorizeRoles('admin'), getList);
userRoute.get("/:id",authorizeRoles('admin'), searchById);
userRoute.post("/register", register);
userRoute.delete("/:id",authorizeRoles('admin'),deleteUser);
userRoute.post("/login", login);

export default userRoute;
