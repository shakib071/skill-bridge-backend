import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";


const updateUserProfile = async(req:Request,res:Response,next: NextFunction) => {
    try{
        
        const userId = req.user?.id;
        if(!userId){
            return res.status(401).json({
                success:false,
                message: "Unauthorized",
            })
        }
        const result = await userService.updateUserProfile(userId,req.body);
        res.status(200).json({
            success:true,
            data:result,
            message: "Successfully Updated User profiles"
        })
    }
    catch(e){
        next(e);
    }
}



export const userController = {
    updateUserProfile,
}