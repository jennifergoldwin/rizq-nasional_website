"use client";
import { Investment, Plan,  UserInfoForAdmin } from "@/utils/model";
import React from "react";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";

type Props = {
  showDepositModal: boolean;
  setShowDepositModal: any;
  handleDepositModal: any;
  handleWithdrawalModal: any;
  investList: Investment[];
  // planList: Plan[];
  // stockList: Stocks[];
  selectedUser: UserInfoForAdmin | undefined;
};
type FormValues = {
  dateDeposit: string;
  totalDeposit: string;
  totalProfit: string;
  submitType: string;
  // Add other fields as needed
};
const DepositModal = (props: Props) => {
  const {
    handleSubmit,
    control,register,
    watch,setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const submitType = useWatch({control, name: 'submitType' });

  const onSubmit: SubmitHandler<FormValues> = async (data)  => {
    if (props.selectedUser) {
      const bodyReq = {
        userIdentityNumber: props.selectedUser.identityNumber,
        totalDeposit: data.totalDeposit,
        totalProfit: data.totalProfit,
      }

      if (submitType === 'deposit') {
        // Handle deposit logic
        props.handleDepositModal(bodyReq)
        
      } else if (submitType === 'withdrawal') {
        // Handle withdrawal logic
        props.handleWithdrawalModal(bodyReq)
      }
      setValue("dateDeposit","")
      setValue("totalDeposit","")
      setValue("totalProfit","")
      props.setShowDepositModal(!props.showDepositModal);
      
    }
  };

  const [totalValue, setTotalValue] = React.useState<number>(0);
  
  React.useEffect(()=>{
    const amountDepo = parseFloat(watch('totalDeposit'));
    const amountProfit = parseFloat(watch('totalProfit'));
    if (!isNaN(amountProfit) && !isNaN(amountDepo)){
      setTotalValue(amountDepo+amountProfit)
    }else{
      setTotalValue(0)
    }
  },[watch('totalDeposit'), watch('totalProfit')])
  

  return (
    <div
      id="deposit-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        props.showDepositModal ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Deposit
            </h3>
            <button
              onClick={() => props.setShowDepositModal(!props.showDepositModal)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              {/* <Controller
                name="dateDeposit"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <div className="col-span-2">
                      <label
                        htmlFor="dateDeposit"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        id="dateDeposit"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Deposit Date"
                        required
                        {...field}
                      />
                    </div>
                  </>
                )}
              /> */}
              <Controller
                name="totalDeposit"
                control={control}
                defaultValue=""
                render={({ field }) => {
                  return (
                  <>
                    <div className="sm:col-span-1 col-span-2">
                      <label
                        htmlFor="totalDeposit"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Total Deposit
                      </label>
                      <input
                        type="number"
                        id="totalDeposit"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Total Deposit"
                        required
                        {...field}
                      />
                    </div>
                  </>
                  )
                }}
              />
              <Controller
                name="totalProfit"
                control={control}
                defaultValue=""
                render={({ field }) => {
                  return (
                    <>
                    <div className="sm:col-span-1 col-span-2">
                      <label
                        htmlFor="totalProfit"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Total Profit
                      </label>
                      <input
                        type="number"
                        id="totalProfit"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Total Profit"
                        required
                        {...field}
                      />
                    </div>
                  </>
                  )
                }}
              />
              
              <div className="col-span-2">
                <label
                  htmlFor="totalValue"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Total Value
                </label>
                <input
                  type="number"
                  value={totalValue.toFixed(2)}
                  id="totalValue"
                  readOnly // Make it read-only to prevent direct user input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              
              value="deposit"
              {...register("submitType")}
              onClick={()=>setValue('submitType',"deposit")}
              className="text-white inline-flex items-center bg-[#5A64C3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#5A64C3] dark:focus:ring-blue-800"
            >
              Deposit
            </button>
            <button
              type="submit"
              {...register("submitType")}
              onClick={()=>setValue('submitType',"withdrawal")}
              value="withdrawal"
              className="ml-3 text-white inline-flex items-center bg-[#5A64C3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#5A64C3] dark:focus:ring-blue-800"
            >
              Withdrawal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
