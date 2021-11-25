import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export const createUser = async (user, wallet)=> {
	const createdUser = await prisma.user.create({
    data: {
      ...user,
      wallet: {
        create: {
          ...wallet
        }
      }
    },
    include:{
      wallet: true
    }
  })
  return createdUser
}


export const discountInUserBalance = async (id, charge)=> {
  return await prisma.$transaction(async (prisma) => {
    const updatedUser= await prisma.user.update({
      where:{
        id
      },
      data: {
        wallet: {
          update:{
            balance:{
              decrement: charge
            }
          }
        }
      },
      include:{
        wallet: true
      }
    })
    if ((updatedUser.wallet?.balance || -1 ) < 0) {
      throw new Error(`${updatedUser.id} doesn't have enough to discount ${charge}`)
    }
    return updatedUser
  })
}


export const rechargeUserBalance = async (id, amount)=> {
  const updatedUser= await prisma.user.update({
    where:{
      id
    },
    data: {
      wallet: {
        update:{
          balance:{
            increment: amount
          }
        }
      }
    },
    include:{
      wallet: true
    }
  })
  return updatedUser
}

export const transferMoney = async (from, to, amount)=> {
  const sender = await prisma.user.update({
    where:{
      id: from
    },
    data: {
      wallet: {
        update:{
          balance:{
            decrement: amount
          }
        }
      }
    },
    include:{
      wallet: true
    }
  })

  if (sender.wallet?.balance && sender.wallet?.balance < 0) {
    throw new Error(`${from} doesn't have enough to send ${amount}`)
  }

  const recipient = prisma.user.update({
    where:{
      id: to
    },
    data: {
      wallet: {
        update:{
          balance:{
            increment: amount
          }
        }
      }
    },
    include:{
      wallet: true
    }
  })
  return recipient
}