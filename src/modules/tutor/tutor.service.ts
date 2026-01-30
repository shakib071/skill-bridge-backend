import { string } from "better-auth";
import { prisma } from "../../lib/prisma";
import { CreateTutorProfileInput } from "../../types/tutorProfile.type";


const createTutorProfile = async (payload: CreateTutorProfileInput) => {
    
    const result = await prisma.tutorProfile.create({data:payload});
    return result;
}

const getTutorProfiles = async(query: Record<string,any>) => {
    const allowedFields = [
        "id",
        "userId",
        "categoryId",
        "bio",
        "hourly_rate",
        "subjects",
        "total_session_completed",
        "average_rating",
        "languages",
        "isFeatured",
        "experienceYears",
        "education",
        "created_at",
        "updated_at"
    ];

    const filters: Record<string, any> = {};
    Object.entries(query)
    .filter(([_, value]) => value !== undefined && value !== "")
    .forEach(([key, value]) => {
      if (allowedFields.includes(key)) {
        filters[key] = { equals: value, mode: "insensitive" }; 
      }
    });

    const result = await prisma.tutorProfile.findMany({where:filters});
    return result;
}


export const tutorService = {
    createTutorProfile,
    getTutorProfiles,
}