const prisma = require("../config/prismaConfig");
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

// Get public key from filesystem
const publicKey = Bun.file("../keyPair/public.pem");

// JWT options
const options = {
  jwtFromRequiest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secterOrKey: publicKey,
  algorithms: ["RSA256"],
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
