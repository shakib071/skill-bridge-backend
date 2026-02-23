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
        where:{
            ...filters,
            user:{
                status:"ACTIVE",
            }
        },
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
                id:true,
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

const getTutorSelfProfile = async(id:string) => {
    const tutors = await prisma.tutorProfile.findUnique({
        where: {
            userId:id
        },
        select: {
            id: true,
            bio: true,
            hourly_rate: true,
            subjects: true,
            languages: true,
            experienceYears: true,
            education: true,
            isFeatured: true,
            total_session_completed: true,
            created_at: true,

            user: {
                select: {
                    name: true,
                    email: true,
                    emailVerified: true,
                    image: true,
                },
            },

            category: {
                select: {
                    name: true,
                },
            },
        },
});

}

const updateTutorProfile = async(tutorId:string , payload:Record<string,any>) => {
    const {
        name,
        bio,
        hourly_rate,
        experienceYears,
        education,
        subjects,
        languages,
        categoryId,
    } = payload;

        const tutor = await prisma.tutorProfile.findUnique({
      where: { id: tutorId },
      select: { userId: true },
    });

    if (!tutor) {
      throw new Error("Tutor Not found");
    }

     await prisma.user.update({
      where: { id: tutor.userId },
      data: { name },
    });

    const result = await prisma.tutorProfile.update({
      where: { id: tutorId },
      data: {
        bio,
        hourly_rate: hourly_rate,
        experienceYears,
        education,
        subjects,
        languages,
        categoryId,
      },
    });

    return result;

}

const updateIsFeature = async(tutorId:string,payload: Record<string,any>) => {
    const {isFeatured} = payload;
    const result = await prisma.tutorProfile.update({
    where: { id: tutorId },
    data: { isFeatured },
  });
  return result;
}

const getOverview = async(Id:string) => {

    const tutorProfile = await prisma.tutorProfile.findUnique({
        where: { userId: Id },
        select: { id: true }
    });

    if (!tutorProfile) throw new Error("Tutor profile not found");

    const tutorId = tutorProfile.id;
   
    const [upcomingSessions, completedSessions, student] = await Promise.all([
      prisma.bookings.count({
        where: {
          tutorId,
          status: "CONFIRMED",
        },
      }),
      prisma.bookings.count({
        where: {
          tutorId,
          status: "COMPLETED",
        },
      }),
      prisma.bookings.findMany({
        where: {
          tutorId,
          status: "COMPLETED",
        },
        distinct: ["studentId"],
        select: { studentId: true },
      }),
    ])
    const students = student?.length || 0;

    return {upcomingSessions,completedSessions,students };
}



export const tutorService = {
    createTutorProfile,
    getTutorProfiles,
    getTutorProfileById,
    getTutorSelfProfile,
    updateTutorProfile,
    updateIsFeature,
    getOverview,
}



