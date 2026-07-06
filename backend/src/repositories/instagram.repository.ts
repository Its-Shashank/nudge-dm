import { prisma } from "../config/db";
import { Prisma } from "@prisma/client";
import { encrypt, decrypt } from "../utils/encryption";

export class InstagramRepository {
  private encryptAccountTokens<T extends { accessToken: string; refreshToken?: string | null }>(
    data: T
  ): T {
    const encrypted = { ...data };
    encrypted.accessToken = encrypt(data.accessToken);
    if (data.refreshToken) {
      encrypted.refreshToken = encrypt(data.refreshToken);
    }
    return encrypted;
  }

  private decryptAccountTokens<T extends { accessToken: string; refreshToken?: string | null }>(
    account: T | null
  ): T | null {
    if (!account) return null;
    const decrypted = { ...account };
    decrypted.accessToken = decrypt(account.accessToken);
    if (account.refreshToken) {
      decrypted.refreshToken = decrypt(account.refreshToken);
    }
    return decrypted;
  }

  async findByUserId(userId: string) {
    const account = await prisma.instagramAccount.findFirst({
      where: { userId },
    });
    return this.decryptAccountTokens(account);
  }

  async findByInstagramId(instagramId: string) {
    const account = await prisma.instagramAccount.findUnique({
      where: { instagramId },
    });
    return this.decryptAccountTokens(account);
  }

  async create(data: Prisma.InstagramAccountUncheckedCreateInput) {
    const encryptedData = this.encryptAccountTokens(data);
    const account = await prisma.instagramAccount.create({
      data: encryptedData,
    });
    return this.decryptAccountTokens(account);
  }

  async update(id: string, data: Prisma.InstagramAccountUncheckedUpdateInput) {
    let updateData = { ...data };
    if (typeof data.accessToken === "string") {
      updateData.accessToken = encrypt(data.accessToken);
    }
    if (typeof data.refreshToken === "string") {
      updateData.refreshToken = encrypt(data.refreshToken);
    }
    const account = await prisma.instagramAccount.update({
      where: { id },
      data: updateData,
    });
    return this.decryptAccountTokens(account);
  }

  async delete(id: string) {
    return prisma.instagramAccount.delete({
      where: { id },
    });
  }

  async deleteByUserId(userId: string) {
    return prisma.instagramAccount.deleteMany({
      where: { userId },
    });
  }
}

export const instagramRepository = new InstagramRepository();
