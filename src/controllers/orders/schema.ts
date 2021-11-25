import type { FromSchema } from "json-schema-to-ts";

 export const createOrderBodySchema = {
  type: "object",
  properties: {
    client_id: { type: 'string' },
    products: { 
        type: "array",
        items: {
          type: "object",
          properties: { 
            product_id: { type: 'string' },
            quantity: { type: 'number', default: 1 }
          },
          required: ['product_id']
        }
    },
  },
  required: ['client_id', 'products']
} as const;

export type OrderBodyType = FromSchema<typeof createOrderBodySchema>