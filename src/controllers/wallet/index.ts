import { chargeOrderBodySchema , rechargeWalletBodySchema, transferMoneyBodySchema} from './schema';
import { handlerPath } from '@libs/handlerResolver';

export const chargeOrder = {
  handler: `${handlerPath(__dirname)}/handler.chargeOrder`,
  events: [
    {
      http: {
        method: 'put',
        path: 'wallet/charge_order',
        request: {
          schemas: {
            'application/json': chargeOrderBodySchema
          }
        },
      }
    },
  ]
}
export const rechargeWallet= {
  handler: `${handlerPath(__dirname)}/handler.rechargeWallet`,
  events: [
    {
      http: {
        method: 'put',
        path: 'wallet/recharge',
        request: {
          schemas: {
            'application/json': rechargeWalletBodySchema
          }
        },
      }
    },
  ]
}
export const transferMoney= {
  handler: `${handlerPath(__dirname)}/handler.transferMoney`,
  events: [
    {
      http: {
        method: 'put',
        path: 'wallet/transfer-money',
        request: {
          schemas: {
            'application/json': transferMoneyBodySchema
          }
        },
      }
    },
  ]
}