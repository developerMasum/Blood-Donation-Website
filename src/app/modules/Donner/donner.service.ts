import  bcrypt  from 'bcrypt';
import { PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();

const createDonner = async (data: any) => {
    const hashedPassword: string = await bcrypt.hash(data.password, 12)
    
  const userData = {
    email: data.donner.email,
    password: hashedPassword,
    role: UserRole.DONAR,
  };
  console.log(data.donner);
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createdDonnerData = await transactionClient.donner.create({
      data: data.donner,
    });
    return createdDonnerData;
  });
  return result;
};



export const DonnerService = {
   createDonner,
};
