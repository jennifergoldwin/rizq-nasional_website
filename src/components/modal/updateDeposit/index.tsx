"use client";
import Table from "@/components/table";
import { Investment, Statement, UserInfoForAdmin } from "@/utils/model";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Props = {
  statementList: Statement[];
  showStatementModal: boolean;
  showAddStatementModal: boolean;
  setShowAddStatementModal: any;
  setShowStatementModal: any;
  selectedUser: UserInfoForAdmin | undefined;
  handleEditStatement: any;
};

const StatementModal = (props: Props) => {
  // const {
  //   handleSubmit,
  //   control,
  //   register,
  //   setValue,
  //   watch,
  //   formState: { errors },
  // } = useForm<FormValues>();

  // const [selectedInvestment, setSelectedInvestment] =
  //   React.useState<Investment>();
  //   const [totalValue, setTotalValue] = React.useState<number>(0);

  // const onSubmit: SubmitHandler<FormValues> = async (data) => {
  //   // console.log(data);
  //   if (selectedInvestment){
  //     let si = selectedInvestment;
  //     si.totalDeposit = data.totalDeposit;
  //     si.totalProfit = data.totalProfit;
  //     props.setShowUpdateDepositModal(!props.showUpdateDepositModal);
  //     props.handleUpdateDepositModal(si);
  //   }

  // };

  // React.useEffect(() => {
  //   const id = watch("invesmentId");
  //   if (id != "") {
  //     const x = props.investList.find((item) => item.id === id);
  //     if (x!=undefined){
  //       setSelectedInvestment(x);
  //       setValue("totalDeposit",x.totalDeposit)
  //       setValue('totalProfit',x.totalProfit);
  //     }

  //   }
  // }, [watch("invesmentId")]);

  // React.useEffect(()=>{
  //   const amountDepo = parseFloat(watch('totalDeposit'));
  //   const amountProfit = parseFloat(watch('totalProfit'));
  //   if (!isNaN(amountProfit) && !isNaN(amountDepo)){
  //     setTotalValue(amountDepo+amountProfit)
  //   }else{
  //     setTotalValue(0)
  //   }
  // },[watch('totalDeposit'), watch('totalProfit')])

  return (
    <div
      id="update-deposit-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        props.showStatementModal ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-lg max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Statement
            </h3>
            <button
              onClick={() =>
                props.setShowStatementModal(!props.showStatementModal)
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
          <div className="pb-8">
            <div className={`flex justify-end items-center mx-8 pt-4 pb-4`}>
              <button
                onClick={() => {
                  props.setShowStatementModal(!props.showStatementModal)
                  props.setShowAddStatementModal(!props.showAddStatementModal)
                }}
                className={`flex text-white text-xs bg-[#5A64C3] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center  `}
              >
                Add Statement
              </button>
            </div>
            <Table
              handleEditStatement={props.handleEditStatement}
              thList={[
                "Full Name",
                "User IC",
                "Date",
                "Product",
                "Leverage",
                "Profit / Loss",
                "Action",
              ]}
              tbList={props.statementList.filter((st) => {
                if (props.selectedUser) {
                  return st.userIdentityNumber
                    .toLowerCase()
                    .match(props.selectedUser.identityNumber);
                }
              })}
              type={"admin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatementModal;
