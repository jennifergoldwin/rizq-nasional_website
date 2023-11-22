export const cookies = {
  token: "token",
  identityNumber: "identityNumber",
  fullName: "fullName",
  role: "Role",
};

export const cookiesAdmin = {
  token: "tokenAdmin",
  username: "usernameAdmin",
  fullName: "fullNameAdmin",
  role: "RoleAdmin",
};

export const roleType = {
  masterAdmin: "ROLE_MASTER_ADMIN",
  subAdmin: "ROLE_ADMIN",
};

export const formatToMYR = (price: number) => {
  const formattedAmount: string = new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return formattedAmount;
};
