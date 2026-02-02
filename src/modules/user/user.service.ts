import { prisma } from "../../lib/prisma";


const updateUserProfile = async(id:string,payload:Record<string,any>) => {
    const {name , role } = payload;

    const result = await prisma.user.update({
      where: { id },
      data: { name, role },
    });

    return result;
}


export const userService = {
    updateUserProfile,
}