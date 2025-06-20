import { PrismaClient } from "../../prisma/app/generated/prisma/client";

const prisma = new PrismaClient();

export const deleteExpiredTokens = async () => {
  const now = new Date();
  try {
    const result = await prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: now, // delete expired tokens
        },
      },
    });
    console.log(`deleted ${result.count} tokens`);
  } catch (error) {
    console.error("Error while deleting tokens:", error);
  }
};
