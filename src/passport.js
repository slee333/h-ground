import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

/* 
    * verifyUser; callback function of passport.use.
        When a request is made, process token, acquire user id, and look for appropriate user.
*/
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      // We found user!
      return done(null, user);
    } else {
      return done(null, false);
      // Or I can make a new user account?
    }
  } catch (error) {
    // Could not execute prisma to find user. Prisma problem. Returning error.
    return done(error, false);
  }
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    // if (error) {
    //   console.log("Error in authentication:", error);
    // }
    if (user) {
      // We got user from verifyUser. Attaching user to request
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
