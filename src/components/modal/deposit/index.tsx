"use client";
import { Plan, Stocks, UserInfoForAdmin } from "@/utils/model";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Props = {
  showDepositModal: boolean;
  setShowDepositModal: any;
  handleDepositModal: any;
  planList: Plan[];
  stockList: Stocks[];
  selectedUser: UserInfoForAdmin | undefined;
};
type FormValues = {
  depoDate: string;
  plan: string;
  amount: string;
  [stockId: string]: string;
  // Add other fields as needed
};
const DepositModal = (props: Props) => {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (props.selectedUser) {
      const stockData = Object.keys(data)
        .filter(
          (key) =>
            typeof data[key] === "string" &&
            key !== "depoDate" &&
            key !== "plan" &&
            key !== "amount"
        )
        .map((stockId) => ({
          stockId: stockId,
          value: data[stockId],
        }));
      const bodyInv = {
        userIdentityNumber: props.selectedUser.identityNumber,
        date: data.depoDate,
        dateWithdrawl: null,
        planId: data.plan,
        amount: totalDeposit,
        statusPlan: "Done",
        statusWithdrawl: "false",
        assetsAllocation: stockData,
      };
      props.setShowDepositModal(!props.showDepositModal);
      props.handleDepositModal(bodyInv);
    }
  };

  const [totalDeposit, setTotalDeposit] = React.useState<number>(0);

  const updateTotalDeposit = (
    stockId: string,
    amount: string,
    currPrice: number
  ) => {
    const numericAmount = parseFloat(amount);
    const newTotalDeposit = totalDeposit + numericAmount * currPrice;
    setTotalDeposit(newTotalDeposit);
  };

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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <Controller
                name="depoDate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <div className="col-span-2">
                      <label
                        htmlFor="depoDate"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        id="depoDate"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Full Name"
                        required
                        {...field}
                      />
                    </div>
                  </>
                )}
              />
              <Controller
                name="plan"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="plan"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Plan
                      </label>
                      <select
                        required
                        id="plan"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        {...field}
                      >
                        <option disabled value="">
                          Select Plan
                        </option>
                        {props.planList.map((item: Plan) => (
                          <option key={item.id} value={item.id}>
                            {item.planType}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              />

              {/* <Controller
                name={"amount"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    
                  </>
                )}
              /> */}

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Total Deposit
                </label>
                <input
                  type="number"
                  value={totalDeposit.toFixed(2)}
                  id="amount"
                  readOnly // Make it read-only to prevent direct user input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>

              {props.stockList.length === 0 ? (
                <h3 className="text-sm grid font-semibold text-red-500 dark:text-red-500">
                  No stock, add stock first
                </h3>
              ) : (
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Assets allocation
                </h3>
              )}

              {props.stockList.map((item: Stocks) => (
                <div className="col-span-2" key={item.id}>
                  <label
                    htmlFor={`stock-${item.id}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {`${item.stockName} (Price RM${item.currPrice})`}
                  </label>
                  <Controller
                    name={item.id}
                    control={control}
                    defaultValue=""
                    render={({ field }) => {
                      const { onChange, ...rest } = field;
                      return (
                        <input
                          type="number"
                          {...rest}
                          id={`stock-${item.id}`}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Value"
                          onChange={(e) => {
                            onChange(e);
                            updateTotalDeposit(
                              item.id,
                              e.target.value,
                              item.currPrice
                            );
                          }}
                          required
                        />
                      );
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              disabled={props.stockList.length === 0 ? true : false}
              className="text-white inline-flex items-center bg-[#5A64C3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#5A64C3] dark:focus:ring-blue-800"
            >
              Add deposit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
