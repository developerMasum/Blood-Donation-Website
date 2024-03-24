
import  bcrypt  from 'bcrypt';
import { PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();

const createSeeker = async (data: any) => {
    const hashedPassword: string = await bcrypt.hash(data.password, 12)
    // console.log(data);
    
  const userData = {
    email: data.seeker.email,
    password: hashedPassword,
    role: UserRole.SEEKER,
  };
  // console.log(userData);
  // console.log(userData);
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createdSeekerData = await transactionClient.seeker.create({
      data: data.seeker,
    });
    return createdSeekerData;
  });
  return result;
};

export const SeekerService={
    createSeeker
}