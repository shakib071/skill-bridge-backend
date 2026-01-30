import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";
import { success } from "better-auth";




const postCategory = async (req:Request,res:Response,next:NextFunction) => {
    try{
        // console.log(req.body);
        const result = await CategoryService.createCategory(req.body);
        res.status(201).json({
            success: true,
            data: result,
            message: "Category Created"
        })
    }
    catch(error){
        next(error);
    }
}

const getCategory = async (req:Request,res:Response,next:NextFunction) => {
    try{
        
        const query = Object.fromEntries(Object.entries(req.query));
        // console.log(query);
        const result = await CategoryService.getCategory(query);

        res.status(200).json({
            success:true,
            data:result,
            message: "Successfully fetched category"
        })
    }

    catch(e){
        next(e);
    }
}

export const CategoryController = {
    getCategory,
    postCategory,
}