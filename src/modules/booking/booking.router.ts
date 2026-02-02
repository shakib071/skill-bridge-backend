import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../types/enum";
import { bookingController } from "./booking.controller";

const router = Router();


router.post(
    "/",
    auth(Role.STUDENT,Role.ADMIN,Role.ADMIN),
    bookingController.createBooking
)

router.get(
    "/sessions",
    auth(Role.STUDENT,Role.TUTOR),
    bookingController.getSession
)


router.get(
    "/get-all-bookings",
    auth(Role.ADMIN),
    bookingController.getAllBookings
)

router.get(
    "/get-completed-bookings",
    auth(Role.STUDENT),
    bookingController.getAllBookingWithoutReviewForSpecificStudent
)

router.patch(
    "/update-booking-status/:id",
    auth(Role.STUDENT,Role.TUTOR),
    bookingController.updateBookingStatus
)




export const bookingRouter = router;