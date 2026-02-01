import { Router } from "express";
import { availabilityController } from "./availability.controller";
import auth from "../../middleware/auth";
import { Role } from "../../types/enum";

const router = Router();


router.post(
    "/",
    auth(Role.TUTOR),
    availabilityController.createAvailability
)

router.get(
    "/",
    auth(Role.TUTOR),
    availabilityController.getAvailability
)

router.delete(
    "/:id",
    auth(Role.TUTOR),
    availabilityController.deleteAvailability
)

router.get(
    "/without-booked/:id",
    availabilityController.getAvailabilityByIdWithoutBooked
)




export const availabilityRouter = router;