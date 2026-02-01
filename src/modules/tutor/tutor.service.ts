import { string } from "better-auth";
import { prisma } from "../../lib/prisma";
import { CreateTutorProfileInput } from "../../types/tutorProfile.type";


const createTutorProfile = async (payload: CreateTutorProfileInput) => {
    const {userId} = payload;
    const existing = await prisma.tutorProfile.findUnique({ where: { userId } });

    if(existing){
        throw new Error("Tutor Profile is already exists");
    }

    
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
       if (!allowedFields.includes(key)) return;

      
      if (["id", "userId", "categoryId", "experienceYears", "total_session_completed"].includes(key)) {
        filters[key] = value;
      } else if (key === "isFeatured" && (query.isFeatured==="true" || query.isFeatured==="false")) {
        filters.isFeatured = value === "true";
      } else {
        
        filters[key] = { equals: value, mode: "insensitive" };
      }
    });

  
    const result = await prisma.tutorProfile.findMany({
        where:filters,
        include: {
            user: {
            select: {
                name: true,
                image: true,
            },
            },
            category: {
            select: {
                name: true,
            },
            },
            bookings: {
            where: {
                review: {
                isNot: null,
                },
            },
            include: {
                review: {
                select: {
                    rating: true,
                },
                },
            },
            },
        },
        });

    return result;
}


const getTutorProfileById = async(id:string,userId:string) => {
    
    if(id !== userId){
        throw new Error("You are not authorized");
        
    }

    const result = await prisma.tutorProfile.findUnique({
        where: {
            userId
        },
        include: {
            user: {
            select: {
                name: true,
                
            },
            },
            category: {
            select: {
                name: true,
            },
            },
            bookings: {
            where: {
                review: {
                isNot: null,
                },
            },
            include: {
                review: {
                select: {
                    rating: true,
                },
                },
            },
            },
        },
    });

    

    return result;

}


export const tutorService = {
    createTutorProfile,
    getTutorProfiles,
    getTutorProfileById,
}