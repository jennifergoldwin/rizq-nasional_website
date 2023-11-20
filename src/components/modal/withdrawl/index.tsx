"use client";
import { Investment, UserInfoForAdmin } from "@/utils/model";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Props = {
  showWithdrawModal: boolean;
  setShowWithdrawlModal: any;
  handleWithdrawlModal: any;
  investList: Investment[];
};

type FormValues = {
  invesmentId: string;
};
const WithdrawlModal = (props: Props) => {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const [selectedInvestment, setSelectedInvestment] =
    React.useState<Investment>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    props.setShowWithdrawlModal(!props.showWithdrawModal);
    props.handleWithdrawlModal(selectedInvestment);
  };

  React.useEffect(() => {
    const id = watch("invesmentId");
    if (id != "") {
      const x = props.investList.find((item) => item.id === id);
      setSelectedInvestment(x);
    }
  }, [watch("invesmentId")]);

  return (
    <div
      id="withdrawl-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        props.showWithdrawModal ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Withdrawl
            </h3>
            <button
              onClick={() =>
                props.setShowWithdrawlModal(!props.showWithdrawModal)
              }
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
              <Controller
                name="invesmentId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <div className="col-span-2">
                      <label
                        htmlFor="invesmentIdW"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Investment
                      </label>
                      <select
                        required
                        id="invesmentIdW"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        {...field}
                      >
                        <option disabled value="">
                          Select Investment
                        </option>
                        {props.investList
                          .filter(
                            (item: Investment) =>
                              item.statusWithdrawal === "false"
                          )
                          .map((item: Investment) => (
                            <option key={item.id} value={item.id}>
                              {item.id}
                            </option>
                          ))}
                      </select>
                    </div>
                  </>
                )}
              />
              {/* <Controller
                name="investmentType"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="col-span-2">
                      <label
                        htmlFor="investmentType"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Investment History
                      </label>
                      <select
                        required
                        id="investment"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        {...field}
                        onChange={(e) => {
                          const selectedInvestmentId = e.target.value;
                          const selectedInvestment = props.investList.find(
                            (item) => item.id === selectedInvestmentId
                          );
                          setSelectedInvestment(selectedInvestment);
                        }}
                      >
                        <option disabled value="">
                          Select Invesment
                        </option>
                        {props.investList.map((item: Statement) => (
                          <option key={item.id} value={item.id}>
                            {item.id}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              /> */}

              <div className="col-span-2">
                <label
                  htmlFor="dateDepositW"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Deposit Date
                </label>
                <input
                  type="date"
                  name="dateDeposit"
                  id="dateDepositW"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Deposit Date"
                  required
                  readOnly
                  value={
                    selectedInvestment ? selectedInvestment.dateDeposit : ""
                  }
                />
              </div>

              {/* <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="endDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Amount"
                  required
                  readOnly
                  value={selectedInvestment ? selectedInvestment.endDate : ""}
                />
              </div> */}

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="totalDepositW"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Total Deposit
                </label>
                <input
                  type="number"
                  name="totalDeposit"
                  id="totalDepositW"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  readOnly
                  value={
                    selectedInvestment ? selectedInvestment.totalDeposit : 0
                  }
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="totalProfitW"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Total Profit
                </label>
                <input
                  type="number"
                  name="totalProfit"
                  id="totalProfitW"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  readOnly
                  value={
                    selectedInvestment ? selectedInvestment.totalProfit : 0
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-[#5A64C3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#5A64C3] dark:focus:ring-blue-800"
            >
              Withdrawl
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawlModal;
