import { createOrder as createOrderModel, updateOrder ,findOrderById } from '@models/order.model'
import { discountInUserBalance } from '@models/user.model'
import { OrderBodyType } from "@controllers/orders/schema";
import { ChargeOrderBodyType } from "@controllers/wallet/schema";

export const createOrder = async (orderParam) => {
	const order: OrderBodyType = JSON.parse(orderParam)
	const createdOrder = await createOrderModel(order)
	const total: number = createdOrder.products.map(row=> 
    (row.quantity * (row?.product?.price || 0))
  ).reduce((sum, value) => sum + value)
	return updateOrder({...createdOrder, total})
}

export const chargeOrder = async (chargeOrderParam) => {
	const chargeOrder: ChargeOrderBodyType = JSON.parse(chargeOrderParam)
	const order = await findOrderById(chargeOrder.order_id)
	const totalToCharge: number = order?.total || -1
	const userIdToBeCharged = order?.userId
	console.log(userIdToBeCharged, totalToCharge)
	if(userIdToBeCharged && totalToCharge > -1){
		return await discountInUserBalance(userIdToBeCharged, totalToCharge)
	}
	throw new Error(`user couldn't be found for order ${chargeOrder.order_id}`);
	
}