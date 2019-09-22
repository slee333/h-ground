import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        // return all users! Does not even need to be async
        allUsers: () => prisma.users()
    }
}