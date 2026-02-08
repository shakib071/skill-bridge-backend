
import { prisma } from "../../lib/prisma";


const getOverview = async() => {
   const [totalUsers,totalTutors,totalStudents,totalBookings] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({where:{role: "TUTOR"}}),
    prisma.user.count({where: {role: "STUDENT"}}),
    prisma.bookings.count(),
   ])
   return {totalUsers,totalTutors,totalStudents,totalBookings};
}


export const adminService = {
    getOverview,
}