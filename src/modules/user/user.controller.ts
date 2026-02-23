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


const getAllUsers = async(req:Request,res:Response,next: NextFunction) => {
    try{
        
        const userId = req.user?.id;
        
        
        if(!userId){
            return res.status(401).json({
                success:false,
                message: "Unauthorized",
            })
        }
        const result = await userService.getAllUsers();
        res.status(200).json({
            success:true,
            data: result,
            message: "Successfully fetched all users"
        })
    }
    catch(e){
        next(e);
    }
}

const updateUserStatus = async(req:Request,res:Response,next: NextFunction) => {
    try{
        
        const userId = req.user?.id;
        const {id} = req.params;
        if(!userId){
            return res.status(401).json({
                success:false,
                message: "Unauthorized",
            })
        }
        const result = await userService.updateUserStatus(id as string ,req.body);
        res.status(200).json({
            success:true,
            data: result,
            message: "Successfully updated users status"
        })
    }
    catch(e){
        next(e);
    }
}


const getOverView = async(req:Request,res:Response,next: NextFunction) => {
    try{
        
        // const userId = req?.user?.id;
        // console.log(userId);
        const {id} = req.params;
        if(!id){
            return res.status(401).json({
                success:false,
                message: "Unauthorized",
            })
        }
        const result = await userService.getOverview(id as string);
        res.status(200).json({
            success:true,
            data: result,
            message: "Successfully fetched Overview data "
        })
    }
    catch(e){
        next(e);
    }
}



export const userController = {
    updateUserProfile,
    getAllUsers,
    updateUserStatus,
    getOverView,
}