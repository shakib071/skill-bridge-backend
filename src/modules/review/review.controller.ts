import { NextFunction, Request, Response } from "express";
import { reviewService } from "./review.service";


const createReview = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const userId= req?.user?.id;
        if (!userId) {
            return res.status(401).json({ 
                success:false,
                message: "Unauthorized"
            });
        }

        const result = await reviewService.createReview(req.body)

        res.status(201).json({
            success:true,
            data:result,
            message: "Created a Review successfully"
        })
    }
    catch(e){
        next(e);
    }
}


const getReviewByTutorId = async(req:Request,res:Response,next:NextFunction) => {
    try{
        
        const {id}= req.params;

        const result = await reviewService.getReviewByTutorId(id as string);

        res.status(201).json({
            success:true,
            data:result,
            message: "Created a Review successfully"
        })
    }
    catch(e){
        next(e);
    }
}




export const reviewController = {
    createReview,
    getReviewByTutorId,
}
