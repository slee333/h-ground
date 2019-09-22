import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

// Check if provided secret matches with secret generated in DB.
export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // If user provided correct secret, return user token.
        return generateToken(user.id);
      } else {
        throw Error("Wrong email secret combination");
      }
    }
  }
};
