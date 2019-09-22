// resolver just to test request

export default {
  Mutation: {
    test: async (_, __, { request }) => {
      console.log("RequestSecret: user:", request.user);
      return `User's name is: ${request.user.name} All the mighty!`;
    }
  }
};
