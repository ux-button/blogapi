const prisma = require("../config/prismaConfig");

const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

getUser
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });

module.exports = { getUser };
