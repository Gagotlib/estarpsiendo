import { createUserController, getUserByIdController, getUserController, loginUserController } from "../controllers/usersController"
import { Router } from "express"
import { validateCreationUserData } from "../middlewares/validateCreationUserData"
import { validateLoginUserData } from "../middlewares/validateLoginUserData"

const usersRoute: Router = Router()

usersRoute.get("/", getUserController)
usersRoute.get("/:id", getUserByIdController)
usersRoute.post("/register", validateCreationUserData, createUserController)
usersRoute.post("/login", validateLoginUserData, loginUserController)

export default usersRoute
