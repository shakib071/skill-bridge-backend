import express, { Router } from 'express';
import { CategoryController } from './category.controller';
const router =  Router();

router.get(
    "/",
    CategoryController.getCategory
)

router.post(
    "/",
    CategoryController.postCategory
)

export const categoryRouter: Router = router;