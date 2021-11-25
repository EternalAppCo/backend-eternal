import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { Order } from "@prisma/client";
import { createOrder as createOrderService } from "@services/order.service";
import { middyfy } from "@libs/middyfy";

import { createOrderBodySchema } from "./schema";

export const order: ValidatedEventAPIGatewayProxyEvent<typeof createOrderBodySchema> = async (event) => {
  const order: Order = await createOrderService(event.body);
  return formatJSONResponse({
    order,
  });
};

export const main = middyfy(order);
