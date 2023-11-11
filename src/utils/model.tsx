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
}