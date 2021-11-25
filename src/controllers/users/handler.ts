import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { User } from '@prisma/client';
import { createUser } from '@services/user.service';

import { bodySchema } from './schema';

const users: ValidatedEventAPIGatewayProxyEvent<typeof bodySchema> = async (event) => {
  const user: User = await createUser(event.body)
  return formatJSONResponse({
    user,
  });
} 

export const main = users;
