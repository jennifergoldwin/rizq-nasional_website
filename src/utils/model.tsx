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

export interface User{
  token: string ;
  identityNumber: string;
  fullName: string;
  role: ROLE
}

export interface Admin{
  fullName: string;
  username: string;
}

export interface UserInfoForAdmin{
  identityNumber:string;
  fullName:string;
  email:string;
  phoneNumber:string;
  totalDeposit:number;
  createdby: string;
}

export enum ROLE{
  ROLE_USER,
  ROLE_MASTER_ADMIN,
  ROLE_ADMIN
}

export interface Stocks{
  id:string;
  stockName:string;
  currPrice:number;
}