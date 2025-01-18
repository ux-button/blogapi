const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../config/prismaConfig");

// Get user by id
const getUser = async (username) => {
  return (user = await prisma.user.findUnique({ where: { username } }));
};

// Get private key
const privateKey = await Bun.file("../keyPair/private.pem");

const loginController = (req, res) => {
  // Get login and password from requiest
  const { username, password } = req.body();

  getUser(username)
    .then(async (user) => {
      await prisma.$disconnect();

      // Chech does the user exist
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Compare hashed passwords
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      // Create token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "1h",
        }
      );
      return res.status(201).json({ token });
    })
    .catch(async (error) => {
      await prisma.$disconnect();
      return res.status(400).json({ message: "Something went wrong" }, error);
    });
};

module.exports = { loginController };
