import { PrismaClient, Prisma } from "@prisma/client";
import APIError from "@utils/errors";
type PrismaType = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;
const prisma: PrismaType = new PrismaClient();
const prismaFull = new PrismaClient();

export const createUser = async (user, wallet) => {
  const createdUser = await prisma.user.create({
    data: {
      ...user,
      wallet: {
        create: {
          ...wallet,
        },
      },
    },
    include: {
      wallet: true,
    },
  });
  return createdUser;
};

export const discountInUserBalance = async (id, charge, prismaTransaction = prisma) => {
  const updatedUser = await prismaTransaction.user.update({
    where: {
      id,
    },
    data: {
      wallet: {
        update: {
          balance: {
            decrement: charge,
          },
        },
      },
    },
    include: {
      wallet: true,
    },
  });
  if ((updatedUser.wallet?.balance || -1) < 0) {
    throw new APIError("1006", `mountToDiscount: -${charge} - userId: ${updatedUser.id}`);
  }
  return updatedUser;
};

export const rechargeUserBalance = async (id, amount) => {
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      wallet: {
        update: {
          balance: {
            increment: amount,
          },
        },
      },
    },
    include: {
      wallet: true,
    },
  });
  return updatedUser;
};

export const transferMoney = async (from, to, amount) => {
  return await prismaFull.$transaction(async (prisma) => {
    const sender = await prisma.user.update({
      where: {
        id: from,
      },
      data: {
        wallet: {
          update: {
            balance: {
              decrement: amount,
            },
          },
        },
      },
      include: {
        wallet: true,
      },
    });

    if (sender.wallet?.balance && sender.wallet?.balance < 0) {
      throw new APIError("1007", `mountToTansfer: ${amount} - from: ${from} - to: ${to}`);
    }

    const recipient = prisma.user.update({
      where: {
        id: to,
      },
      data: {
        wallet: {
          update: {
            balance: {
              increment: amount,
            },
          },
        },
      },
      include: {
        wallet: true,
      },
    });
    return recipient;
  });
};
