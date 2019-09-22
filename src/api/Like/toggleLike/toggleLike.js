import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      // first resolver requring auth!
      // IsAuthenticated로 request를 분석해서 로그인된 유저가 행하는 행동인지 판단하고, 유저가 로그인되어있지 않으면 에러를 낸다.
      isAuthenticated(request);
      const { threadId } = args;
      const { user } = request;
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            thread: {
              id: threadId
            }
          }
        ]
      };
      try {
        const existingLike = await prisma.$exists.like(filterOptions); // And this will return true or false.
        if (existingLike) {
          // * Turning like off!
          // We are going to delete many likes that has the same structure as what's in existingLike
          await prisma.deleteManyLikes(filterOptions);
          
        } else {
          // * Turning like on
          const newLike = await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            thread: {
              connect: {
                id: threadId
              }
            }
          });
        }
        return true;
      } catch (error) {}
    }
  }
};
