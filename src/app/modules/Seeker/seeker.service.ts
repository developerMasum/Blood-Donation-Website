
import  bcrypt  from 'bcrypt';
import { Prisma, PrismaClient, UserRole } from "@prisma/client";
import { IPaginationOptions } from '../../interfaces/pagination';
import { ISeekerFilterRequest } from './seeker.interface';
import { paginationHelper } from '../../../helpers/paginationHelpers';
import { seekerSearchAbleFields } from './seeker.constans';
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

const getAllFromDB = async (params: ISeekerFilterRequest, options: IPaginationOptions) => {
  console.log(options)
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.SeekerWhereInput[] = [];

  //console.log(filterData);
  if (params.searchTerm) {
      andConditions.push({
          OR: seekerSearchAbleFields.map(field => ({
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
  const whereConditions: Prisma.SeekerWhereInput = { AND: andConditions }

  const result = await prisma.seeker.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: options.sortBy && options.sortOrder ? {
          [options.sortBy]: options.sortOrder
      } : {
          createdAt: 'desc'
      }
  });

  const total = await prisma.seeker.count({
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

export const SeekerService={
    createSeeker,
    getAllFromDB
}