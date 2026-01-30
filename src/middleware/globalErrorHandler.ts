import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";
import { success } from "better-auth";

function errorHandler(err:any, req:Request,res:Response,next:NextFunction){
    let statusCode = err.statusCode || 500;
    let errorMessage = err.message || "Internal Server Error";
    let errorDatails = err || null;

    if(err instanceof Prisma.PrismaClientValidationError){
        statusCode = 400;
        errorMessage = "You Provided Invalid Data or missing required fields";
    }

    else if(err instanceof Prisma.PrismaClientKnownRequestError){
        if (err.code === "P2025") {
            statusCode = 400;
            errorMessage = "An operation failed because it depends on one or more records that were required but not found."
        }
        else if (err.code === "P2002") {
            statusCode = 400;
            errorMessage = "Duplicate key error"
        }
        else if (err.code === "P2003") {
            statusCode = 400;
            errorMessage = "Foreign key constraint failed"
        }
    }

    else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        statusCode = 500;
        errorMessage = "Error occurred during query execution"
    }
    else if (err instanceof Prisma.PrismaClientInitializationError) {
        if (err.errorCode === "P1000") {
            statusCode = 401;
            errorMessage = "Authentication failed. Please check your creditials!"
        }
        else if (err.errorCode === "P1001") {
            statusCode = 400;
            errorMessage = "Can't reach database server"
        }
    }

    res.status(statusCode).json({
        success:false,
        message: errorMessage,
        error:errorDatails
    })
}

export default errorHandler;