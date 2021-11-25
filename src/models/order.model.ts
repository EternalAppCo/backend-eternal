import { PrismaClient, Order } from '@prisma/client'
import { OrderBodyType } from "@controllers/orders/schema";

const prisma = new PrismaClient()


export const createOrder = async (order: OrderBodyType)=> {
	const createdOrder = await prisma.order.create({
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

export const updateOrder = async (order: Partial<Order>)=> {
  const updateOrder = await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      total:  order.total,
      userId:  order.userId,
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

export const findOrderById = async (orderId: string)=> {
  const foundOrder = await prisma.order.findUnique({
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
