import { Router } from "express";

import { Role } from "../../types/enum";
import auth from "../../middleware/auth";
import { userController } from "./user.controller";


const router = Router();

router.put(
    "/",
    auth(Role.TUTOR,Role.STUDENT),
    userController.updateUserProfile

)

router.get(
    "/get-all-users",
    auth(Role.ADMIN),
    userController.getAllUsers
)

router.patch(
    "/update-user-status/:id",
    auth(Role.ADMIN),
    userController.updateUserStatus
)

router.get(
    "/overview/:id",
    // auth(Role.STUDENT),
    userController.getOverView
)


export const userRouter = router;