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

const getAvailability = async(tutorUserId:string)=>{
    const tutor = await prisma.tutorProfile.findUnique({
        where:{
            userId:tutorUserId,
        }
    });

    if(!tutor?.id){
        throw new Error("Tutor Not Found");
    }

    const tutorId = tutor?.id;
    const result = await prisma.availability.findMany({
        where:{
            tutorId,
        }
    });
    
    return result;

}


const deleteAvailability = async(id:string,tutorUserId:string) => {
    const tutor = await prisma.tutorProfile.findUnique({
        where:{
            userId:tutorUserId,
        }
    });

    if(!tutor?.id){
        throw new Error("Tutor Not Found");
    }

    const tutorId = tutor?.id;

    const record = await prisma.availability.findUnique({
      where: { id },
      select: { id: true, tutorId: true }
    });

    if (!record) {
      throw new Error('data not found');
    }

    if (record.tutorId !== tutorId) {
      throw new Error('Unauthorized: Tutor ID does not match');
    }

    const result = await prisma.availability.delete({
      where: { id }
    });

    return result;

}

const getAvailabilityByIdWithoutBooked = async(tutorId:string) => {
    const result = await prisma.availability.findMany({
        where:{
            tutorId,
            isBooked:false
        }
    });

    return result;
}


export const availabilityService = {
    createAvailability,
    getAvailability,
    deleteAvailability,
    getAvailabilityByIdWithoutBooked,
}