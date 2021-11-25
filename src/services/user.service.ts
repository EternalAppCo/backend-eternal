import { createUser as createUserModel } from "@models/user.model";

export const createUser = async (userParam) => {
  const user = JSON.parse(userParam);
  return createUserModel(
    {
      name: user.name,
      email: user.email,
    },
    user.wallet,
  );
};
