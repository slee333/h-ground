import {prisma} from "../../../../generated/prisma-client"

export default {
    Query:{
        userById: async(_,args) => {
            const {id} = args;
            // Same as return await prisma.user({id: id})
            return await prisma.user({ id })
        }
    }
}