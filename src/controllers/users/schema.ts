import type { FromSchema } from "json-schema-to-ts";

export const bodySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    wallet: {
      type: "object",
      properties: {
        balance: { type: "number" },
      },
    },
  },
  required: ["name", "email"],
} as const;

export const responseSchema = {
  type: "object",
  properties: {
    user: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        walletId: { type: "string" },
        wallet: {
          type: "object",
          properties: {
            balance: { type: "number" },
          },
        },
      },
    },
  },
} as const;

export type UserBodyType = FromSchema<typeof bodySchema>;
