import { prisma } from "../lib/prisma";
import { Role } from "../types/enum";


async function seedAdmin() {
    try {
        console.log("***** Admin Seeding Started....")
        const adminData = {
            name: process.env.ADMIN_NAME as string,
            email: process.env.ADMIN_EMAIL as string,
            role: Role.ADMIN,
            password: process.env.ADMIN_PASSWORD as string,
            
            
        }
        console.log("***** Checking Admin Exist or not")
 
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        });

        if (existingUser) {
            throw new Error("User already exists!!");
        }

        const signUpAdmin = await fetch("https://skillbridges-ten.vercel.app/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": process.env.APP_URL as string
            },
            body: JSON.stringify(adminData)
        });



        if (signUpAdmin.ok) {
            console.log("**** Admin created")
            await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified: true
                }
            })

            console.log("**** Email verification status updated!")
        }
        console.log("******* SUCCESS ******")

    } catch (error) {
        console.error(error);
    }
}

seedAdmin()