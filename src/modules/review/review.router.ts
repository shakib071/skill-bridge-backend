import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../types/enum";
import { reviewController } from "./review.controller";


const router = Router();

router.post(
    "/create",
    auth(Role.STUDENT),
    reviewController.createReview
)

router.get(
    "/get-reviews/:id",
    reviewController.getReviewByTutorId
)


export const reviewRouter = router;