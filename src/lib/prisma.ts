// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma client to avoid multiple instances in hot‑reloading environments.
 */
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // In development we reuse the same client across module reloads.
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;
