-- CreateTable
CREATE TABLE "Learner" (
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

    CONSTRAINT "Learner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Learner_wallet_key" ON "Learner"("wallet");
