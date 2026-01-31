import  { Router } from "express";
import { tutorController } from "./tutor.controller";
import auth from "../../middleware/auth";
import { Role } from "../../types/enum";



const router = Router();

router.post(
    "/",
    auth(Role.TUTOR),
    tutorController.createTutorProfile
)

router.get(
    "/",
    tutorController.getTutorProfiles
)




export const tutorRouter = router;