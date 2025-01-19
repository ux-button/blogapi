import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prismaConfig";

// Get user by id
const getUser = async (username) => {
  return await prisma.user.findUnique({ where: { username } });
};

// Get private key
const privateKey = await Bun.file("../back/keyPair/private.pem").text();

const loginController = async (req, res) => {
  // Get login and password from requiest
  const { username, password } = req.body;
  getUser(username)
    .then(async (user) => {
      // Chech does the user exist
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Find user and validate password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "1h",
        }
      );

      // Send success response
      res.status(201).json({ token });
    })
    .catch(async (error) => {
      return res.status(400).json({ message: "Something went wrong", error });
    });
};

export { loginController };
