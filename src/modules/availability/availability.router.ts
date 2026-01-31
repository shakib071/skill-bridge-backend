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





export const availabilityRouter = router;