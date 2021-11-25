import { createOrder as createOrderModel, updateOrder ,findOrderById } from '@models/order.model'
import { discountInUserBalance } from '@models/user.model'
import { OrderBodyType } from "@controllers/orders/schema";
import { ChargeOrderBodyType } from "@controllers/wallet/schema";
import APIError from '@utils/errors';
import { updateProductStock } from '@models/product.model';
import { PrismaClient, OrderStatus } from '@prisma/client'
const prisma = new PrismaClient()

export const createOrder = async (orderParam) => {
	return await prisma.$transaction(async (tx) => {
		const order: OrderBodyType = JSON.parse(orderParam)
		const createdOrder = await createOrderModel(order, tx)
		const total: number = createdOrder.products.map(row=> {
			if((row.product?.stock === 0) && row.product?.stock < row.quantity){
				throw new APIError('1002', `productId: ${row?.product?.id} - productName: ${row?.product?.name}`)
			}else if(row.product?.stock !== undefined && row.quantity > row.product?.stock ){
				throw new APIError('1005', `productId: ${row?.product?.id} - productName: ${row?.product?.name}`)
			}
			if(row.quantity > 0){
				return (row.quantity * (row?.product?.price || 0))
			}
			throw new APIError('1001', `productId: ${row?.product?.id}`)
		}
		).reduce((sum, value) => sum + value)
		return updateOrder({...createdOrder, total}, tx)
	})
}

export const chargeOrder = async (chargeOrderParam) => {
	return await prisma.$transaction(async (tx) => {
		const chargeOrder: ChargeOrderBodyType = JSON.parse(chargeOrderParam)
		const order = await findOrderById(chargeOrder.order_id, tx)
		if(order?.status === OrderStatus.PAID){
			throw new APIError('1004', `orderId: ${order.id}`)
		}
		order?.products.forEach(async (row) => {
			await updateProductStock(row.productId, row.quantity)
		})
		await updateOrder({...order, status: OrderStatus.PAID}, tx)
		const totalToCharge: number = order?.total || -1
		const userIdToBeCharged = order?.userId
		if(userIdToBeCharged && totalToCharge > -1){
			return await discountInUserBalance(userIdToBeCharged, totalToCharge, tx)
		}
		throw new APIError('1003', `orderId: ${chargeOrder.order_id}`)
	})	
}