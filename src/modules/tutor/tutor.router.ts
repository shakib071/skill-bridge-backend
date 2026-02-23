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

router.get(
    "/tutor-self-profile",
    auth(Role.TUTOR),
    tutorController.getTutorSelfProfile
)

router.put(
    "/update-profile/:id",
    auth(Role.TUTOR),
    tutorController.updateTutorProfile
)

router.patch(
    "/update-isfeatured/:id",
    auth(Role.ADMIN),
    tutorController.updateIsFeature
)

router.get(
    "/overview/:id",
    // auth(Role.TUTOR),
    tutorController.getOverview
)




export const tutorRouter = router;