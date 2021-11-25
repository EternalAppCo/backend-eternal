import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateProductStock = async (productId: string, decrement: number) => {
  const updateProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      stock: {
        decrement,
      },
    },
  });
  return updateProduct;
};
