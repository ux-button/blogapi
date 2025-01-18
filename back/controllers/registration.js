import bcrypt from "bcryptjs";
import { prisma } from "../config/prismaConfig";

// Create user
const registerUser = async (username, password) => {
  await prisma.user.create({
    data: { username, password },
  });
};

const registrationController = (req, res) => {
  // Get login and password from requiest
  const { username, password } = req.body();

  // Hash password
  bcrypt.hash(password, 10, async (error, hashedPassword) => {
    // Check for errors
    if (error) {
      return res.status(400).json({ message: "Error registering user" }, error);
    }

    // Store user in database
    registerUser(username, hashedPassword)
      .then(async () => {
        await prisma.$disconnect();
        return res.status(201).json({ message: "User successfully created" });
      })
      .catch(async (error) => {
        await prisma.$disconnect();
        return res
          .status(400)
          .json({ message: "Error registering user" }, error);
      });
  });
};

export { registrationController };
