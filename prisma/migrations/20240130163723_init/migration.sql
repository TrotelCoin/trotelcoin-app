/*
  Warnings:

  - You are about to drop the `Learner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Learner";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "wallet" TEXT NOT NULL,
    "username" TEXT,
    "avatar" TEXT,
    "numberOfQuizzesAnswered" INTEGER NOT NULL DEFAULT 0,
    "numberOfQuizzesCreated" INTEGER NOT NULL DEFAULT 0,
    "totalRewards" INTEGER NOT NULL DEFAULT 0,
    "totalRewardsClaimed" INTEGER NOT NULL DEFAULT 0,
    "totalRewardsPending" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_key" ON "User"("wallet");
