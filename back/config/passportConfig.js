import { prisma } from "./prismaConfig";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

// Get public key from filesystem
const publicKey = Bun.file("../keyPair/public.pem");
console.log(publicKey);

// JWT options
const options = {
  // Extracts token from 'Authorization: Bearer <token>'
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // Public key for verification
  secretOrKey: publicKey,
  // Algorithm used to sign the JWT
  algorithms: ["RS256"],
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      // Get user by id
      const user = await prisma.user.findUnique({ where: { id: payload.id } });

      // Check existanse of the user
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);
