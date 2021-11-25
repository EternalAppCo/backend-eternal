import { PrismaClient, Prisma,  Order } from '@prisma/client'
import { OrderBodyType } from "@controllers/orders/schema";
type PrismaType = Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">
const prisma:PrismaType  = new PrismaClient()


export const createOrder = async (order: OrderBodyType, prismaTransaction = prisma)=> {
	const createdOrder = await prismaTransaction.order.create({
    data: {
      user:{
        connect:{
          id : order.client_id
        }
      },
      products:{
        createMany:{
          data: order.products.map(product => ({
            productId: product.product_id,
            quantity: product.quantity,
          })),
        },
      }
    },
    include:{
      products: {
        include:{
          product: true
        }
      },
      user: true,
    }
  })
  return createdOrder
}

export const updateOrder = async (order: Partial<Order>, prismaTransaction= prisma)=> {
  const updateOrder = await prismaTransaction.order.update({
    where: {
      id: order.id,
    },
    data: {
      total:  order.total,
      userId:  order.userId,
      status: order.status,
    },
    include:{
      products: {
        include:{
          product: true
        }
      },
      user: true,
    }
  })
  return updateOrder
}

export const findOrderById = async (orderId: string, prismaTransaction = prisma)=> {
  const foundOrder = await prismaTransaction?.order?.findUnique({
    where: {
      id: orderId,
    },
    include:{
      products: {
        include:{
          product: true
        }
      },
      user: true,
    }
  })
  return foundOrder
}
