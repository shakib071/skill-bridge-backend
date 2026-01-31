import { prisma } from "../../lib/prisma"


const createAvailability = async(payload: Record<string,any>,tutorUserId:string) => {
    const tutor = await prisma.tutorProfile.findUnique({
        where:{
            userId:tutorUserId,
        }
    });

    if(!tutor?.id){
        throw new Error("Tutor Not Found");
    }

    const tutorId = tutor?.id;

    const conflict = await prisma.availability.findFirst({
        where: {
            tutorId,
            day: payload.day,
            startTime: { lt: payload.endTime },
            endTime: { gt: payload.startTime },
        }
    });

    if(conflict){
        throw new Error("Time slot already exists");
    }

    const slot = await prisma.availability.create({
        data:{
            tutorId,
            day:payload.day,
            startTime:new Date(payload.startTime),
            endTime: new Date(payload.endTime)
        },
    });
    return slot;
}


export const availabilityService = {
    createAvailability,
}