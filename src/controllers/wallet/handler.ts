import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { User } from '@prisma/client';
import { chargeOrder as chargeOrderService } from '@services/order.service';
import { rechargeWallet as rechargeWalletService, transferMoney as transferMoneyService } from '@services/wallet.service';
import { chargeOrderBodySchema, rechargeWalletBodySchema, transferMoneyBodySchema} from './schema';
import { middyfy } from '@libs/middyfy';

const chargeOrderController: ValidatedEventAPIGatewayProxyEvent<typeof chargeOrderBodySchema> = async (event) => {
    const userWithDiscountInBalance: User = await chargeOrderService(event.body)
    return formatJSONResponse({
      userWithDiscountInBalance,
    });
}

const rechargeWalletController: ValidatedEventAPIGatewayProxyEvent<typeof rechargeWalletBodySchema> = async (event) => {
  const userWithRechergedBalance: User = await rechargeWalletService(event.body)
  return formatJSONResponse({
    userWithRechergedBalance,
  });
}

const transferMoneyController: ValidatedEventAPIGatewayProxyEvent<typeof transferMoneyBodySchema> = async (event) => {
  const userWithRechergedBalance: User = await transferMoneyService(event.body)
  return formatJSONResponse({
    userWithRechergedBalance,
  });
}

export const chargeOrder = middyfy(chargeOrderController)
export const rechargeWallet = middyfy(rechargeWalletController)
export const transferMoney = middyfy(transferMoneyController)