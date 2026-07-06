import { prisma } from "../config/db";
import { Prisma } from "@prisma/client";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        subscriptions: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        subscriptions: true,
        instagramAccounts: true,
      },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}

export const userRepository = new UserRepository();
