import { prisma } from "../../lib/prisma";


const createReview = async(payload:Record<string,any>) => {
    const { bookingId, rating, comment } = payload;

    const existingReview = await prisma.reviews.findUnique({
      where: { bookingId },
    });

    

    if(existingReview){
        throw new Error("Reviews Already Exists");
    }


    const review = await prisma.reviews.create({
      data: {
        bookingId,
        rating,
        comment,
      },
    });

    return review;


}

const getReviewByTutorId = async(tutorId:string) => {
   
  const reviews = await prisma.reviews.findMany({
    where: {
      booking: {
        tutorId: tutorId,
      },
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      created_at: true,
      booking: {
        select: {
          student: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return reviews;
}




export const reviewService = {
    createReview,
    getReviewByTutorId,
}