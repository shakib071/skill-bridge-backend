import { prisma } from "../../lib/prisma";


const updateUserProfile = async(id:string,payload:Record<string,any>) => {
    const {name , role } = payload;

    const result = await prisma.user.update({
      where: { id },
      data: { name, role },
    });

    return result;
}


const getAllUsers = async() => {
    const result = await prisma.user.findMany({
        where:{
            role:{
                not:"ADMIN",
            }
        },
        include:{
            tutorProfile:{
                select:{
                    id:true,
                    isFeatured:true,
                }
            }
        }
    });
    return result;
}

const updateUserStatus = async(id:string,payload: Record<string,any>) => {
    const {status} = payload;

    const result = await prisma.user.update({
        where : {
            id:id
        },
        data:{
            status:status
        }
    })
    return result;
}

const getOverview =async(studentId:string) => {
    if (!studentId) {
        throw new Error("Student ID missing");
    }
    

    const [upcomingSessions, completedSessions, tutor] = await Promise.all([
      
      prisma.bookings.count({
        where: { studentId:studentId, status: "CONFIRMED" },
      }),
      
      prisma.bookings.count({
        where: { studentId:studentId, status: "COMPLETED" },
      }),
      
      prisma.bookings.findMany({
        where: { studentId:studentId, status: "COMPLETED" },
        distinct: ["tutorId"],
        select: { tutorId: true },
      }),
    ]);
    const tutors = tutor?.length || 0;
    return {upcomingSessions,completedSessions,tutors};
}


export const userService = {
    updateUserProfile,
    getAllUsers,
    updateUserStatus,
    getOverview,
}