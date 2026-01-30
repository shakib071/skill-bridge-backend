import e, { Router } from "express";
import { tutorController } from "./tutor.controller";

const router = Router();

router.post(
    "/",
    tutorController.createTutorProfile
)

router.get(
    "/",
    tutorController.getTutorProfiles
)


export const tutorRouter = router;