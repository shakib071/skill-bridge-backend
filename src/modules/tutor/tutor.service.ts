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
}


export const tutorService = {
    createTutorProfile,
    getTutorProfiles,
    getTutorProfileById,
    getTutorSelfProfile,
    updateTutorProfile,
    updateIsFeature,
}



// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const tutorId = params.id;
//     const body = await req.json();

//     const data = updateTutorSchema.parse(body);

//     // 1️⃣ Get categoryId from category name
//     const category = await prisma.category.findUnique({
//       where: { name: data.category },
//       select: { id: true },
//     });

//     if (!category) {
//       return new Response("Invalid category", { status: 400 });
//     }

//     // 2️⃣ Update TutorProfile + User in one query
//     const updatedTutor = await prisma.tutorProfile.update({
//       where: { id: tutorId },
//       data: {
//         bio: data.bio,
//         hourly_rate: data.hourly_rate,
//         experienceYears: data.experienceYears,
//         subjects: data.subjects,
//         languages: data.languages,
//         categoryId: category.id,
//         user: {
//           update: {
//             name: data.name,
//           },
//         },
//       },
//       include: {
//         user: true,
//         category: true,
//       },
//     });

//     return Response.json(updatedTutor, { status: 200 });

//   } catch (err: any) {
//     return new Response(err.message || "Update failed", { status: 400 });
//   }
// }
