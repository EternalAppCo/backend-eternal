
import {StatusCodes} from 'http-status-codes';

export default class APIError extends Error {
  constructor(code, messsage = '') {
    super(code);
    this.name = errorMap[code].httpCode;
    this.message = `${errorMap[code].message} (${messsage})`;
  }
}

const errorMap = {
	'1001':{
		httpCode: StatusCodes.EXPECTATION_FAILED,
		message: '[1001] quantity of product must be greater than 0'
	},
	'1002':{
		httpCode: StatusCodes.EXPECTATION_FAILED,
		message: '[1002] Product quantity  is not available in stock'
	},
	'1003':{
		httpCode: StatusCodes.EXPECTATION_FAILED,
		message: `[1003] user couldn't be found for this order`
	},
	'1004':{
		httpCode: StatusCodes.EXPECTATION_FAILED,
		message: `[1004] Order is already paid`
	},
	'1005':{
		httpCode: StatusCodes.EXPECTATION_FAILED,
		message: `[1005] Product quantity is greater than stock`
	},
	'1006':{
		httpCode: StatusCodes.EXPECTATION_FAILED,
		message: `[1006] User does not have enough available to charge order`
	},
	'1007':{
		httpCode: StatusCodes.EXPECTATION_FAILED,
		message: `[1007] User does not have enough available to transfer`
	},
	'1008':{
		httpCode: StatusCodes.EXPECTATION_FAILED,
		message: `[1008] Amount to recharge must be greater than 0`
	},
	'1009':{
		httpCode: StatusCodes.EXPECTATION_FAILED,
		message: `[1009] Amount to transfer must be greater than 0`
	},
}