import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";

const getOverview = async(req:Request,res:Response,next:NextFunction) => {
    try{
        
        const result = await adminService.getOverview();
        res.status(201).json({
            success:true,
            data:result,
            message: "Overview fetched Successfully"
        })
    }
    catch(e){
        next(e);
    }
}



export const adminController = {
    getOverview,
}