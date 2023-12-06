export type depositWithdrawl = {
  date: string;
  code: string;
  tenure: string | null;
  endDate: string | null;
  plan: string;
  interest: string;
  amount: string;
  status: string;
};

export interface User {
  token: string;
  identityNumber: string;
  fullName: string;
  role: ROLE;
}

export interface Admin {
  int: string;
  fullName: string;
  username: string;
  password: string;
  role: string;
  createdby: string;
}

export interface UserInfoForAdmin {
  id: string;
  identityNumber: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  totalDeposit: number;
  totalProfit: number;
  createdby: string;
  remark: string;
  registrationDate: string;
}

export enum ROLE {
  ROLE_USER,
  ROLE_MASTER_ADMIN,
  ROLE_ADMIN,
}

// export interface Stocks {
//   id: string;
//   stockName: string;
//   currPrice: number;
// }

export interface Plan {
  id: string;
  planType: string;
  interest: number;
  tenure: number;
  price: number;
}

export interface Statement {
  id: string;
  userName: string;
  userIdentityNumber: string;
  date: string;
  product: string;
  leverage: string;
  profitLoss: string;
}

export interface Investment {
  id: string;
  userIdentityNumber: string;
  dateDeposit: string;
  dateWithdrawal: string;
  totalDeposit: string;
  totalProfit: string;
  statusDeposit: string;
  statusWithdrawal: string;
}
