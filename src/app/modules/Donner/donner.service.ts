import  bcrypt  from 'bcrypt';
import { Prisma, PrismaClient, UserRole } from "@prisma/client";
import { IDonnerFilterRequest } from './donner.interface';
import { IPaginationOptions } from '../../interfaces/pagination';
import { paginationHelper } from '../../../helpers/paginationHelpers';
import { donnerSearchAbleFields } from './donner.constants';

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

const getAllFromDB = async (params: IDonnerFilterRequest, options: IPaginationOptions) => {
  console.log(options)
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.DonnerWhereInput[] = [];

  //console.log(filterData);
  if (params.searchTerm) {
      andConditions.push({
          OR: donnerSearchAbleFields.map(field => ({
              [field]: {
                  contains: params.searchTerm,
                  mode: 'insensitive'
              }
          }))
      })
  };

  if (Object.keys(filterData).length > 0) {
      andConditions.push({
          AND: Object.keys(filterData).map(key => ({
              [key]: {
                  equals: (filterData as any)[key]
              }
          }))
      })
  };

  andConditions.push({
      isDeleted: false
  })

  //console.dir(andCondions, { depth: 'inifinity' })
  const whereConditions: Prisma.DonnerWhereInput = { AND: andConditions }

  const result = await prisma.donner.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: options.sortBy && options.sortOrder ? {
          [options.sortBy]: options.sortOrder
      } : {
          createdAt: 'desc'
      }
  });

  const total = await prisma.donner.count({
      where: whereConditions
  });

  return {
      meta: {
          page,
          limit,
          total
      },
      data: result
  };
};

export const DonnerService = {
   createDonner,
   getAllFromDB
};
