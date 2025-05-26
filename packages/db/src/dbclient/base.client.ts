import { PrismaClient, Prisma } from "../../generated/client";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

/**
 * This is a workaround to prevent multiple Prisma Client instances in development environment.
 * This is necessary because Next.js hot reload will cause the Prisma Client to be instantiated multiple times.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

// Singleton pattern to ensure that the Prisma Client is instantiated only once
const baseClient = globalForPrisma.prisma ?? createPrismaClient();

// To prevent Nextjs hot reload caused multiple prisma client instantiated in dev environment
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = baseClient;

export { baseClient };
