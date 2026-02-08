import { Router } from "express";
import { adminController } from "./admin.controller";
import auth from "../../middleware/auth";
import { Role } from "../../types/enum";

const router = Router();

router.get(
    "/overview",
    auth(Role.ADMIN),
    adminController.getOverview
)

export const AdminRouter = router;