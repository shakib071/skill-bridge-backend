import { NextFunction, Request, Response } from "express";
import { tutorService } from "./tutor.service";


const createTutorProfile = async(req:Request,res:Response,next: NextFunction) => {
    try{

        const result = await tutorService.createTutorProfile(req.body);
        res.status(201).json({
            success:true,
            data:result,
            message: "Tutor Profile Created Successfully"
        })
    }
    catch(e){
        next(e);
    }
}

const getTutorProfiles = async(req:Request,res:Response,next: NextFunction) => {
    try{
        const query = Object.fromEntries(Object.entries(req.query));
        const result = await tutorService.getTutorProfiles(query);
        res.status(200).json({
            success:true,
            data:result,
            message: "Successfully fetched tutor profiles"
        })
    }
    catch(e){
        next(e);
    }
}



export const tutorController = {
    createTutorProfile,
    getTutorProfiles,
}