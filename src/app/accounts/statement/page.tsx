"use client";
import React from "react";
import Table from "@/components/table";
import { Statement, UserInfoForAdmin } from "@/utils/model";
import { cookiesAdmin } from "@/utils/constant";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import Select from "react-select";

interface AddStatementForm {
  date: string;
  product: string;
  leverage: string;
  profitLoss: string;
  password: string;
}

const fetchUserStatement = async (token: String, username: String) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/statement-admin/${username}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
};

export default function Page() {
  const [statementList, setStatementList] = React.useState<Statement[]>([]);
  const [searchKeyword, setSearchKeyword] = React.useState<string>("");
  const [showAddStatementModal, setShowAddStatementModal] =
    React.useState(false);
  const [userList, setUserList] = React.useState<UserInfoForAdmin[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<string>("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AddStatementForm>();

  React.useEffect(() => {
    const username = Cookies.get(cookiesAdmin.username);
    const token = Cookies.get(cookiesAdmin.token);

    if (token && username) {
      const fetchData = async () => {
        const data = await fetchUserStatement(token, username);
        setStatementList(data.result);
      };
      fetchData();
      fetchUser(username, token);
    }
  }, []);

  const onSubmit = async (data: AddStatementForm) => {
    try {
      const us = Cookies.get(cookiesAdmin.username) || "";
      if (us === "") return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/add-statement`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: "",
            userIdentityNumber: selectedUser,
            date: data.date,
            product: data.product,
            leverage: data.leverage,
            profitLoss: data.profitLoss,
          }),
        }
      );

      const { error, message, result } = await response.json();

      // showToast(message, !error);

      if (!error) {
        setShowAddStatementModal(!showAddStatementModal);
        setStatementList((prev) => [...prev, result]);
      }
    } catch (error: any) {}
  };

  const fetchUser = async (username: string, token: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/listuser/${username}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { error, message, result } = await response.json();
      console.log(message);
      if (!error) {
        setUserList((prev) => [...result]);
      }
      //   showToast(message, !error);
    } catch (error: any) {}
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <main className="min-h-screen md:pl-64 w-full">
      <div className="max-w-full mx-auto w-full h-full">
        <div className={`flex justify-between items-center mx-8 py-8`}>
          <input
            className="bg-[#2D3681] rounded px-2 py-2 text-sm "
            type="text"
            value={searchKeyword}
            placeholder="User name keyword.."
            onChange={handleKeywordChange}
          />
          <button
            onClick={() => setShowAddStatementModal(!showAddStatementModal)}
            className={`flex text-white text-xs bg-[#5A64C3] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center  `}
          >
            Add Statement
          </button>
        </div>
        <Table
          thList={["Date", "Product", "Leverage", "Profit / Loss"]}
          tbList={statementList || []}
          type={"admin"}
        />
      </div>

      <div
        id="add-statement-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          showAddStatementModal ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Statement
              </h3>
              <button
                onClick={() => setShowAddStatementModal(!showAddStatementModal)}
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
                  <Select
                    className="text-black"
                    options={userList.map((user) => ({
                      value: user.identityNumber,
                      label: user.fullName,
                    }))}
                    isSearchable required
                    placeholder="Search for a user..."
                    onChange={(selectedOption) => {
                      // Handle selected option
                      if (selectedOption){
                        setSelectedUser(selectedOption.value)
                      }
                    }}
                    filterOption={(option, rawInput) => {
                      const inputValue = rawInput.trim().toLowerCase();
                      const userLabel = option.label.toLowerCase();

                      // Check if the user's name starts with the input value
                      return userLabel.startsWith(inputValue);
                    }}
                  />
                  {/* <input
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Full Name"
                    required
                  /> */}
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
                    type="date"
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
                    type="text"
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
    </main>
  );
}
