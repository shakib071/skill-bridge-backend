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


export const userService = {
    updateUserProfile,
    getAllUsers,
    updateUserStatus,
}