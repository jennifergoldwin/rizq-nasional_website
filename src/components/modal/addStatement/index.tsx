"use client";
import SelectUser from "@/components/admin/select";
import { useForm } from "react-hook-form";
import React from "react";
import { UserInfoForAdmin } from "@/utils/model";
interface AddStatementForm {
  date: string;
  product: string;
  leverage: string;
  profitLoss: string;
  password: string;
}
interface Props {
  showAddStatementModal: boolean;
  setShowAddStatementModal: any;
  showStatementModal: boolean;
  setShowStatementModal: any;
  userList: UserInfoForAdmin[];
  handleAddStatement: any;
  selectedUser: UserInfoForAdmin | undefined;
}
const AddStatementModal = (props: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AddStatementForm>();

  const [selectedUser, setSelectedUser] = React.useState<string>("");

  const onSubmit = async (data: AddStatementForm) => {
    // console.log(data)
    if (props.setShowStatementModal) {
      props.setShowStatementModal(!props.showStatementModal);
    }
    props.setShowAddStatementModal(!props.showAddStatementModal);
    props.handleAddStatement({
      id: "",
      userIdentityNumber: selectedUser,
      date: data.date.replace("T", " "),
      product: data.product,
      leverage: data.leverage,
      profitLoss: data.profitLoss,
    });
  };

  React.useEffect(() => {
    console.log(`sele ${props.selectedUser}`);
    if (props.selectedUser !== undefined) {
      setSelectedUser(
        props.selectedUser ? props.selectedUser.identityNumber : ""
      );
    }
  }, [props.selectedUser]);

  return (
    <div
      id="add-statement-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        props.showAddStatementModal ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Statement
            </h3>
            <button
              onClick={() =>
                props.setShowAddStatementModal(!props.showAddStatementModal)
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
              <div className="col-span-2">
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                {props.selectedUser === undefined ? (
                  <SelectUser
                    setSelectedUser={setSelectedUser}
                    userList={props.userList}
                  />
                ) : (
                  <input
                    // {...register("date", { required: "Date is required" })}
                    type="text"
                    name="date"
                    id="userNameAdd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Date"
                    required
                    readOnly
                    value={props.selectedUser.fullName}
                  />
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  {...register("date", { required: "Date is required" })}
                  type="datetime-local"
                  name="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Date"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="product"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product
                </label>
                <input
                  {...register("product", {
                    required: "Product is required",
                  })}
                  type="text"
                  name="product"
                  id="product"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="leverage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Leverage
                </label>
                <input
                  {...register("leverage", {
                    required: "Leverage is required",
                  })}
                  type="text"
                  name="leverage"
                  id="leverage"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Leverage"
                  required
                />
                {errors.leverage && (
                  <p className="text-red-600 text-sm">
                    {errors.leverage.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="profitLoss"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Profit / Loss
                </label>
                <input
                  {...register("profitLoss", {
                    required: "Profit / Loss is required",
                  })}
                  type="number"
                  name="profitLoss"
                  id="profitLoss"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Profit / Loss"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-[#5A64C3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#5A64C3] dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add new statement
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStatementModal;
