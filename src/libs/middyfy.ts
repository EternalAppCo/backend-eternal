import middy from "@middy/core"
import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const errorMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<APIGatewayProxyResult> => {
    return formatJSONResponse({
      message: request?.error?.message,
    }, Number(request?.error?.name || 500) )
  }

  return {
    onError
  }
}

export const middyfy = (handler) => {
  let middyHandler = middy(handler).use(errorMiddleware())

  return middyHandler
}
