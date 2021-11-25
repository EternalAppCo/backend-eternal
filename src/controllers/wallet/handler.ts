import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { User } from '@prisma/client';
import { chargeOrder as chargeOrderService } from '@services/order.service';
import { rechargeWallet as rechargeWalletService, transferMoney as transferMoneyService } from '@services/wallet.service';
import { chargeOrderBodySchema, rechargeWalletBodySchema } from './schema';

export const chargeOrder: ValidatedEventAPIGatewayProxyEvent<typeof chargeOrderBodySchema> = async (event) => {
  const userWithDiscountInBalance: User = await chargeOrderService(event.body)
  return formatJSONResponse({
    userWithDiscountInBalance,
  });
}

export const rechargeWallet: ValidatedEventAPIGatewayProxyEvent<typeof rechargeWalletBodySchema> = async (event) => {
  const userWithRechergedBalance: User = await rechargeWalletService(event.body)
  return formatJSONResponse({
    userWithRechergedBalance,
  });
}

export const transferMoney: ValidatedEventAPIGatewayProxyEvent<typeof rechargeWalletBodySchema> = async (event) => {
  const userWithRechergedBalance: User = await transferMoneyService(event.body)
  return formatJSONResponse({
    userWithRechergedBalance,
  });
}
