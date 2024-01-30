import { PrismaClient } from "@/prisma/node_modules/@prisma/client";

const prisma = new PrismaClient();

export const db = prisma;
