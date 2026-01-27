import { betterAuth, boolean, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "./prisma";
import enumvales from "../types/rolesType";



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    user: {
        additionalFields: {
            role:{
                type:"string",
                defaultValue: "STUDENT",
                required:true,
                // enumValues: ["STUDENT", "TUTOR", "ADMIN"]
                
            },
            profile_image:{
                type:"string",
                required:false
            },
            isActive:{
                type:"boolean",
                required:false,
                defaultValue:true
            },
            phone:{
                type:"string",
                required:false
            },
            status:{
                type:"string",
                defaultValue:"ACTIVE",
                required:true,
                // enumValues: ["ACTIVE", "BANNED", "SUSPENED"]
                
            }

        }
    }
});