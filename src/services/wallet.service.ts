import { RechargeWalletBodyType , TransferMoneyBodyType} from "@controllers/wallet/schema";
import { rechargeUserBalance, transferMoney as transferMoneyModel } from "@models/user.model";
import APIError from '@utils/errors';

export const rechargeWallet = async (rechargeParam) => {
	const recharge: RechargeWalletBodyType = JSON.parse(rechargeParam)
	if(recharge.amount > 0){
		return rechargeUserBalance(recharge.user_id, recharge.amount)
	}
	throw new APIError('1008', `mountToRecharge: ${recharge.amount}`)
}

export const transferMoney = async (transferMoneyParam) => {
	const transferMoney: TransferMoneyBodyType = JSON.parse(transferMoneyParam)
	if(transferMoney.amount > 0){
		return transferMoneyModel(transferMoney.from, transferMoney.to, transferMoney.amount)
	}
	throw new APIError('1009', `mountToTransfer: ${transferMoney.amount}`)
}