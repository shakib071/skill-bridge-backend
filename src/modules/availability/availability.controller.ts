import { NextFunction, Request, Response } from "express";
import { availabilityService } from "./availability.service";
import { success } from "better-auth/*";

const createAvailability = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const userId= req?.user?.id;
        if (!userId) {
            return res.status(401).json({ 
                success:false,
                message: "Unauthorized"
            });
        }
        const result = await availabilityService.createAvailability(req.body,userId);
        res.status(201).json({
            success:true,
            data:result,
            message: "Availability Slot Created Successfully"
        })
    }
    catch(e){
        next(e);
    }
}



export const availabilityController = {
    createAvailability,
}