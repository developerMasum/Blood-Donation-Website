-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'DONAR', 'SEEKER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'DELETED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHERS');

-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('INDEVITUAL', 'HOSPITAL', 'BLOODBANK');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A', 'A_POSITIVE', 'A_NEGATIVE', 'B', 'B_POSITIVE', 'B_NEGATIVE', 'AB', 'AB_POSITIVE', 'AB_NEGATIVE', 'O', 'O_POSITIVE', 'O_NEGATIVE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "needPasswordChange" BOOLEAN NOT NULL DEFAULT true,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "contactNumber" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seekers" (
    "seekerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "contactNumber" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "upozillaName" TEXT NOT NULL,
    "districtName" TEXT NOT NULL,
    "organizationType" "OrganizationType" NOT NULL,
    "patientAge" INTEGER NOT NULL,
    "patientBloodGroup" "BloodGroup" NOT NULL,
    "medicalCondition" TEXT NOT NULL,
    "reasonForBlood" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seekers_pkey" PRIMARY KEY ("seekerId")
);

-- CreateTable
CREATE TABLE "donners" (
    "donarId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "designation" TEXT,
    "email" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "upozillaName" TEXT NOT NULL,
    "districtName" TEXT NOT NULL,
    "bloodGroup" "BloodGroup" NOT NULL,
    "lastDonatedAt" TIMESTAMP(3),
    "totalDonatedTimes" INTEGER,
    "allergies" BOOLEAN,
    "identification" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donners_pkey" PRIMARY KEY ("donarId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "seekers_email_key" ON "seekers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "seekers_contactNumber_key" ON "seekers"("contactNumber");

-- CreateIndex
CREATE UNIQUE INDEX "donners_email_key" ON "donners"("email");

-- CreateIndex
CREATE UNIQUE INDEX "donners_phoneNumber_key" ON "donners"("phoneNumber");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seekers" ADD CONSTRAINT "seekers_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donners" ADD CONSTRAINT "donners_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
