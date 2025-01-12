const { ExtractJwt, Strategy } = require("passport-jwt");
const passport = require("passport");
const prisma = require("../config/prismaConfig");

const { getUser } = require("../controllers/getUser");

// Get user from database
const getUser = async (userId) => {
  const result = await prisma.user.findUnique({
    where: { id: userId },
  });
  return result;
};

// Settings for JWT Token
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

// Initialize passport
passport.use(
  new Strategy(opts, async (payload, done) => {
    getUser(payload.id)
      .then(async (user) => {
        await prisma.$disconnect();
        return done(null, user);
      })
      .catch(async (err) => {
        await prisma.$disconnect();
        console.log(err);
        return done(err);
      });
  })
);
