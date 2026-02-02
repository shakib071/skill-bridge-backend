import { record } from "better-auth/*";
import { prisma } from "../../lib/prisma";
import { Role } from "../../types/enum";

const createBooking = async(payload: Record<string,any>,userId:string) => {
   

    const updatedSlot = await prisma.availability.update({
        where: { id: payload.availabilityId, isBooked: false },
        data: { isBooked: true },
    });

    if (!updatedSlot) throw new Error("Slot already booked");


    const booking = await prisma.bookings.create({
        data: {
            studentId: userId,
            tutorId:payload.tutorId,
            start_time: payload.start_time,
            end_time: payload.end_time,
            duration:payload.duration,
            total_price: payload.total_price,
        
        },
    });
    return booking;
}


const getSession = async(userId:string,role:string) => {

    let query: any;
    
    if(role == Role.STUDENT){
        query = {studentId:userId}
    }
    else{
        const tutor = await prisma.tutorProfile.findUnique({
            where:{ userId }
        })

        query = {tutorId : tutor?.id};
    }

    const bookings = await prisma.bookings.findMany({
        where: query,
        include: {
        tutor: {
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
          },
        },
        student: {
          select: {
            name: true,
          },
        }
      },
      orderBy:{
        created_at:'desc',
      }
    });

    const formattedBookings = bookings.map((booking) => ({
      id: booking.id,
      start_time: booking.start_time.toISOString(), 
      end_time: booking.end_time.toISOString(),
      duration: booking.duration,
      total_price: Number(booking.total_price),
      tutor: {
        user: { name: booking.tutor.user.name },
        category: booking.tutor.category?.name,
      },
      student: {
        user: { name: booking.student.name },
      },
    }));

    return formattedBookings;

}


const getAllBookings = async() => {
    const result = await prisma.bookings.findMany();
    return result;
}


export const bookingService = {
    createBooking,
    getSession,
    getAllBookings,
}