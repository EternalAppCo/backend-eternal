import { bodySchema, responseSchema } from "./schema";
import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "users",
        request: {
          schemas: {
            "application/json": bodySchema,
          },
        },
        documentation: {
          summary: "Create User",
          description: "Creates a user and a wallet with balance in 0",
          requestBody: {
            description: "A user information object with a wallet",
          },
          requestModels: {
            "application/json": "createUserBody",
          },
          methodResponses: [
            {
              statusCode: 200,
              responseBody: {
                description: "A user was created successfuly",
              },
              responseModels: {
                "application/json": "createUserOKResponse",
              },
            },
            {
              statusCode: 500,
              responseBody: {
                description: "An error message when creating a new user",
              },
              responseModels: {
                "application/json": "ErrorResponse",
              },
            },
          ],
        },
      },
    },
  ],
};

export const models = [
  {
    name: "createUserBody",
    description: "Create user request body",
    contentType: "application/json",
    schema: bodySchema,
  },
  {
    name: "createUserOKResponse",
    description: "Create user response schema",
    contentType: "application/json",
    schema: responseSchema,
  },
];
