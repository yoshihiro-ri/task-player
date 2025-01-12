import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addTask = async (title: string) => {
  return await prisma.task.create({
    data: {
      title,
    }
  });
};

export const getTasks = async () => {
  return await prisma.task.findMany({
    where: {
      is_deleted: false
    },
    orderBy: {
      order: 'asc'
    }
  });
};