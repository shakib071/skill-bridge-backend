import express, { Router } from 'express';
import { CategoryController } from './category.controller';

import { Role } from '../../types/enum';
import auth from '../../middleware/auth';
const router =  Router();

router.get(
    "/",
    CategoryController.getCategory
)

router.post(
    "/",
    auth(Role.ADMIN),
    CategoryController.postCategory
)



export const categoryRouter: Router = router;