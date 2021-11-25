import type { FromSchema } from "json-schema-to-ts";

export const chargeOrderBodySchema = {
  type: "object",
  properties: {
    order_id: { type: "string" },
  },
  required: ["order_id"],
} as const;

export const rechargeWalletBodySchema = {
  type: "object",
  properties: {
    user_id: { type: "string" },
    amount: { type: "number" },
  },
  required: ["user_id", "amount"],
} as const;

export const transferMoneyBodySchema = {
  type: "object",
  properties: {
    from: { type: "string" },
    to: { type: "string" },
    amount: { type: "number" },
  },
  required: ["from", "to", "amount"],
} as const;

export type ChargeOrderBodyType = FromSchema<typeof chargeOrderBodySchema>;
export type RechargeWalletBodyType = FromSchema<typeof rechargeWalletBodySchema>;
export type TransferMoneyBodyType = FromSchema<typeof transferMoneyBodySchema>;
