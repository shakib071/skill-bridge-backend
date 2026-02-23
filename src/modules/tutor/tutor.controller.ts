import { NextFunction, Request, Response } from "express";
import { tutorService } from "./tutor.service";



const createTutorProfile = async(req:Request,res:Response,next: NextFunction) => {
    try{
        req.body.userId = req.user?.id;
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

const formatTutors = (tutors: any[]) => {
  return tutors.map((tutor) => {
    const ratings = tutor.bookings
      .map((b: any) => b.review?.rating)
      .filter((r: number | undefined): r is number => r !== undefined);

    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum: number, r: number) => sum + r, 0) /
          ratings.length
        : 0;

    return {
      id: tutor.id,
      name: tutor.user.name,
      bio:tutor.bio,
      subjects: tutor.subjects,
      languages: tutor.languages,
      image: tutor.user.image,
      category: tutor.category.name,
      hourlyRate: tutor.hourly_rate,
      experienceYears: tutor.experienceYears,
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews: ratings.length,
      isFeatured: tutor.isFeatured,
      totalSessionsCompleted:tutor.total_session_completed
    };
  });
};


const formatTutor = (tutor: any) => {
  const ratings = tutor.bookings
    .map((b: any) => b.review?.rating)
    .filter((r: number | undefined): r is number => r !== undefined);

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum: number, r: number) => sum + r, 0) /
        ratings.length
      : 0;

  return {
    id: tutor.id,
    name: tutor.user.name,
    bio: tutor.bio,
    subjects: tutor.subjects,
    languages: tutor.languages,
    education: tutor.education,
    image: tutor.user.image,
    category: tutor.category.name,
    categoryId:tutor.category.id,
    hourlyRate: tutor.hourly_rate,
    experienceYears: tutor.experienceYears,
    averageRating: Number(averageRating.toFixed(1)),
    totalReviews: ratings.length,
    isFeatured: tutor.isFeatured,
    totalSessionsCompleted: tutor.total_session_completed
  };
};


const getTutorProfiles = async(req:Request,res:Response,next: NextFunction) => {
    try{
        const query = Object.fromEntries(Object.entries(req.query));
        const result = await tutorService.getTutorProfiles(query);
        res.status(200).json({
            success:true,
            data:formatTutors(result),
            message: "Successfully fetched tutor profiles"
        })
    }
    catch(e){
        next(e);
    }
};



const getTutorProfileById = async(req:Request,res:Response,next: NextFunction) => {
    try{
        const {id} = req.params;
        const userId = req.user?.id;
        if(!userId){
            return res.status(401).json({
                success:false,
                message: "Unauthorized",
            })
        }
        const result = await tutorService.getTutorProfileById(id as string,userId);
        res.status(200).json({
            success:true,
            data:formatTutor(result),
            message: "Successfully fetched tutor profiles"
        })
    }
    catch(e){
        next(e);
    }
}




const getTutorSelfProfile = async(req:Request,res:Response,next: NextFunction) => {
    try{
        
        const userId = req.user?.id;
        if(!userId){
            return res.status(401).json({
                success:false,
                message: "Unauthorized",
            })
        }
        const result = await tutorService.getTutorSelfProfile(userId);
        res.status(200).json({
            success:true,
            data:formatTutor(result),
            message: "Successfully fetched tutor profiles"
        })
    }
    catch(e){
        next(e);
    }
}


const updateTutorProfile = async(req:Request,res:Response,next: NextFunction) => {
    try{
        
        const {id} = req.params;
        if(!id){
            return res.status(401).json({
                success:false,
                message: "Unauthorized",
            })
        }
        const result = await tutorService.updateTutorProfile(id as string,req.body);
        res.status(200).json({
            success:true,
            data:result,
            message: "Successfully Updated tutor profiles"
        })
    }
    catch(e){
        next(e);
    }
}

const updateIsFeature = async(req:Request,res:Response,next: NextFunction) => {
    try{
        
        const {id} = req.params;
        const result = await tutorService.updateIsFeature(id as string,req.body);
        res.status(200).json({
            success:true,
            data:result,
            message: "Successfully Updated featured"
        })
    }
    catch(e){
        next(e);
    }
}

const getOverview = async(req:Request,res:Response,next: NextFunction) => {
    try{
        
        const { id }:any = req.params;
        // const userId = req.params
        if(!id){
            return res.status(401).json({
                success:false,
                message: "Unauthorized",
            })
        }
        const result = await tutorService.getOverview(id as string);
        res.status(200).json({
            success:true,
            data:result,
            message: "Successfully  fetched overview"
        })
    }
    catch(e){
        next(e);
    }
}








export const tutorController = {
    createTutorProfile,
    getTutorProfiles,
    getTutorProfileById,
    getTutorSelfProfile,
    updateTutorProfile,
    updateIsFeature,
    getOverview,
}