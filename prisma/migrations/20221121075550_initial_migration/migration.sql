-- CreateTable
CREATE TABLE "apiToken" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mattermostUserId" VARCHAR(255) NOT NULL,
    "pipedriveApiKey" VARCHAR(255) NOT NULL,
    "linkedInLogin" VARCHAR(255) NOT NULL,
    "linkedInPassword" VARCHAR(255) NOT NULL,

    CONSTRAINT "apiToken_pkey" PRIMARY KEY ("id")
);
