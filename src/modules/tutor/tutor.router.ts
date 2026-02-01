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

router.get(
    "/profile/:id",
    auth(Role.TUTOR),
    tutorController.getTutorProfileById
)




export const tutorRouter = router;