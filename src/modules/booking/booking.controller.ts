import { NextFunction, Request, Response } from "express";
import { bookingService } from "./booking.service";


const createBooking = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const userId= req?.user?.id;
        if (!userId) {
            return res.status(401).json({ 
                success:false,
                message: "Unauthorized"
            });
        }

        const result = await bookingService.createBooking(req?.body,userId);

        res.status(201).json({
            success:true,
            data:result,
            message: "Created a Slot  Successfully"
        })
    }
    catch(e){
        next(e);
    }
}

const getSession = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const userId= req?.user?.id;
        const role = req?.user?.role;
        if (!userId) {
            return res.status(401).json({ 
                success:false,
                message: "Unauthorized"
            });
        }

        const result = await bookingService.getSession(userId,role as string);

        res.status(201).json({
            success:true,
            data:result,
            message: "Created a Slot Deleted Successfully"
        })
    }
    catch(e){
        next(e);
    }
}

const getAllBookings = async(req:Request,res:Response,next:NextFunction) => {
    try{
       

        const result = await bookingService.getAllBookings();

        res.status(201).json({
            success:true,
            data:result,
            message: "Created a Slot Deleted Successfully"
        })
    }
    catch(e){
        next(e);
    }
}


const updateBookingStatus = async(req:Request,res:Response,next:NextFunction) => {
    try{
       
        const {id} = req.params;

        const result = await bookingService.updateBookingStatus(id as string,req.body);

        res.status(201).json({
            success:true,
            data:result,
            message: "Updated Booking Status Successfully"
        })
    }
    catch(e){
        next(e);
    }
}


const getAllBookingWithoutReviewForSpecificStudent = async(req:Request,res:Response,next:NextFunction) => {
    try{
       
        const userId = req.user?.id;

        const result = await bookingService.getAllBookingWithoutReviewForSpecificStudent(userId as string);

        res.status(201).json({
            success:true,
            data:result,
            message: "successfully fetched  booking without reviews"
        })
    }
    catch(e){
        next(e);
    }
}



export const bookingController = {
    createBooking,
    getSession,
    getAllBookings,
    updateBookingStatus,
    getAllBookingWithoutReviewForSpecificStudent,
   
    
}