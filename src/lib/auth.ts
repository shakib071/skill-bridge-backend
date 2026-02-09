import { betterAuth, boolean, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASSWORD,
  },
});


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    baseURL: process.env.BETTER_AUTH_URL as string,
    trustedOrigins:[process.env.APP_URL as string , "http://localhost:3000"],
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
    },
    emailAndPassword: { 
        enabled: true, 
        autoSignIn:false,
        requireEmailVerification:false
    },
    emailVerification: {
        sendOnSignUp:true,
        autoSignInAfterVerification:true,
        sendVerificationEmail: async ( { user, url, token }, request) => {
            const VarificationURL = `${process.env.APP_URL}/verify-email?token=${token}`;
            

            try{
                const info = await transporter.sendMail({
                    from: '"SkillBridge<skillBridge.corp@gmail.com>',
                    to: user.email,
                    subject: "Varify your email address",
                    html: `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <meta charset="UTF-8" />
                        <title>Email Verification</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                        <style>
                            body {
                            margin: 0;
                            padding: 0;
                            background-color: #f4f6f8;
                            font-family: Arial, Helvetica, sans-serif;
                            }
                            .container {
                            max-width: 600px;
                            margin: 40px auto;
                            background: #ffffff;
                            padding: 30px;
                            border-radius: 8px;
                            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
                            text-align: center;
                            }
                            .logo {
                            font-size: 24px;
                            font-weight: bold;
                            color: #2563eb;
                            margin-bottom: 20px;
                            }
                            h1 {
                            font-size: 22px;
                            color: #111827;
                            }
                            p {
                            font-size: 15px;
                            color: #4b5563;
                            line-height: 1.6;
                            }
                            .btn {
                            display: inline-block;
                            margin: 25px 0;
                            padding: 12px 24px;
                            background-color: #2563eb;
                            color: #ffffff !important;
                            text-decoration: none;
                            border-radius: 6px;
                            font-weight: 600;
                            }
                            .footer {
                            font-size: 13px;
                            color: #9ca3af;
                            margin-top: 30px;
                            }
                            .link {
                            word-break: break-all;
                            font-size: 13px;
                            color: #2563eb;
                            }
                        </style>
                        </head>
                        <body>
                        <div class="container">
                            <div class="logo">SkillBridge</div>

                            <h1>Verify your email address</h1>

                            <p>
                            Hello ${user.name || "user"}
                            Thanks for signing up for <strong>SkillBridge</strong>!  
                            Please confirm your email address by clicking the button below.
                            </p>

                            <a href="${VarificationURL}" class="btn">
                            Verify Email
                            </a>

                            <p>
                            If the button doesn’t work, copy and paste this link into your browser:
                            </p>

                            <p class="link">${VarificationURL}</p>

                            <p class="footer">
                            If you didn’t create an account, you can safely ignore this email.
                            </p>
                        </div>
                        </body>
                        </html>

                    `
                });

                console.log("Message sent:", info.messageId);
            }
            catch(err){
                console.error("Error sending email:", err);
            }
        },
    },
    socialProviders: {
        google: { 
            prompt: "select_account consent", 
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
            
        
        }, 
    },
    session:{
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, 

        },
    },
    advanced:{
        
        cookiePrefix: "better-auth",
        useSecureCookies: true,
        crossSubDomainCookies: {
            enabled: false,

        },

        disableCSRFCheck: true, // Allow requests without Origin header (Postman, mobile apps, etc.)
        
        // Set cookie attributes based on environment
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
            httpOnly: true,
          
        }
    }
});