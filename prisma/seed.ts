// prisma/seed.ts
import prisma from "../src/lib/prisma";
import { hashPassword } from "../src/lib/auth";

async function main() {
  // Clean previous data (optional)
  await prisma.chatMessage.deleteMany();
  await prisma.outfit.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hashPassword("Password123!");
  const testUser = await prisma.user.create({
    data: {
      email: "test@example.com",
      password: passwordHash,
    },
  });

  console.log("✅ Seed completed. Test user ID:", testUser.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
