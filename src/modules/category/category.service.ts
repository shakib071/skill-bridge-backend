
import { prisma } from "../../lib/prisma";


const createCategory = async(payload:{
    name: string;
    description?:string;
})=> {
    const existingCategory = await prisma.category.findUnique({
        where: {
            name: payload.name
        }
    });
    
    if (existingCategory) {
        throw new Error(`Category with name "${payload.name}" already exists`);
    }

    const result = await prisma.category.create({data:payload});
    return result; 
};



const getCategory = async(query:Record<string,any>) => {
    
    const allowedFields = ["id", "name", "description", "created_at"];
    const filters: Record<string, any> = {};
    Object.entries(query)
    .filter(([_, value]) => value !== undefined && value !== "")
    .forEach(([key, value]) => {
      if (allowedFields.includes(key)) {
        filters[key] = { equals: value, mode: "insensitive" }; 
      }
    });
    // console.log(filters);
   

    const result = await prisma.category.findMany({where:filters});
    return result;
}


export const CategoryService = {
    createCategory,
    getCategory,
}