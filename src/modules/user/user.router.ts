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


export const userRouter = router;