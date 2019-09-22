import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { userName, email, name = "", bio = "" } = args;
      const user = await prisma.createUser({
        userName,
        email,
        name,
        bio
      });
      return user;
    }
  }
};
