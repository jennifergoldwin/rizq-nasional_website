"use client";
import TableDashboard from "@/components/admin/tableDashboard";
import { Investment, Plan,  UserInfoForAdmin } from "@/utils/model";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { cookiesAdmin, roleType } from "@/utils/constant";

interface AddUserForm {
  fullName: string;
  email: string;
  phoneNumber: string;
  identityNumber: string;
  password: string;
}
const Page = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AddUserForm>();
  const [showAddUserModal, setShowAddUserModal] = React.useState(false);
  const [userList, setUserList] = React.useState<UserInfoForAdmin[]>([]);
  // const [planList, setPlanList] = React.useState<Plan[]>([]);
  // const [stockList, setStockList] = React.useState<Stocks[]>([]);
  const [role, setRole] = React.useState("");
  const router = useRouter();

  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const [searchKeyword, setSearchKeyword] = React.useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const filterUserList = () => {
    return userList.filter((user) => {
      switch (selectedOption) {
        case 'identityNumber':
          return user.identityNumber.includes(searchKeyword);
        case 'email':
          return user.email.includes(searchKeyword);
        case 'fullName':
          return user.fullName.includes(searchKeyword);
        case 'phoneNumber':
          return user.phoneNumber.includes(searchKeyword);
        case 'createdby':
          return user.createdby.includes(searchKeyword);
        default:
          return true; // No filter if no option is selected
      }
    });
  };

  const filteredUserList = filterUserList();

  React.useEffect(() => {
    const username = Cookies.get(cookiesAdmin.username) || "";
    const token = Cookies.get(cookiesAdmin.token) || "";
    const adminRole = Cookies.get(cookiesAdmin.role) || "";
    if (username !== "" && token != "" && adminRole != "") {
      fetchUser(username, token);
      // fetchPlan(token);
      // fetchStock(token);
      setRole(adminRole);
    } else {
      setTimeout(() => router.replace("/login-admin"), 2000);
    }
  }, []);

  // const fetchStock = async (token: string) => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASEURL}/all-stocks`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const { error, message, result } = await response.json();

  //     if (!error) {
  //       setStockList((prevList) => [...result]);
  //     }
  //     //   showToast(message, !error);
  //   } catch (error: any) {}
  // };

  // const fetchPlan = async (token: string) => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/plan`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const { error, message, result } = await response.json();

  //     if (!error) {
  //       setPlanList((prev) => [...result]);
  //     }
  //     //   showToast(message, !error);
  //   } catch (error: any) {}
  // };

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
      if (!error) {
        setUserList((prev) => [...result]);
      }
      //   showToast(message, !error);
    } catch (error: any) {}
  };

  const deposit = async (data: any) => {
    console.log(data)
    try {
      const token = Cookies.get(cookiesAdmin.token) || "";
      const username = Cookies.get(cookiesAdmin.username) || "";
      if (token === "" || username === "") return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/deposit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const { error, message, result } = await response.json();

      // showToast(message, !error);

      if (!error) {
        fetchUser(username, token);
      }
    } catch (error: any) {}
  };

  const withdrawl = async (data: Investment) => {
    try {
      const token = Cookies.get(cookiesAdmin.token) || "";
      const username = Cookies.get(cookiesAdmin.username) || "";
      if (token === "" || username === "") return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/withdrawl/${data.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const { error, message, result } = await response.json();

      
      // showToast(message, !error);

      if (!error) {
        fetchUser(username, token);
      }
    } catch (error: any) {}
  };

  const onSubmit = async (data: AddUserForm) => {
    try {
      const us = Cookies.get(cookiesAdmin.username) || "";
      if (us === "") return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: data.fullName,
            email: data.email,
            identityNumber: data.identityNumber,
            password: data.password,
            phoneNumber: data.phoneNumber,
            state: "",
            city: "",
            address: "",
            postCode: "",
            occupation: "",
            bankName: "",
            bankAccountNumber: "",
            bankHolderName: "",
            role: "ROLE_USER",
            createdby: us,
          }),
        }
      );

      const { error, message, result } = await response.json();
      
      // showToast(message, !error);
      
      if (!error) {
        setShowAddUserModal(!showAddUserModal);
        setUserList((prev) => [...prev, result]);
      }else{
        setError('identityNumber', {
          type: 'manual',
          message: message,
        });
      }
    } catch (error: any) {
      
    }
  };

  const handleDepositModal = (value: any) => {
    deposit(value);
  };
  const handleWithdrawlModal = (value: any) => {
    withdrawl(value);
  };

  return (
    <main className="min-h-screen md:pl-64 w-full">
      <div className="max-w-full mx-auto h-full w-full">
        <div
          className={`${
            role === roleType.masterAdmin ? "hidden" : "flex"
          } justify-between items-center mx-8 py-8`}
        >
          <div className="flex gap-4">
            <select className="text-sm bg-[#2D3681] rounded px-2 py-2" value={selectedOption} onChange={handleOptionChange}>
                <option value="" disabled>Filter</option>
                <option value="identityNumber">Identity Number</option>
                <option value="email">Email</option>
                <option value="fullName">Full Name</option>
                <option value="phoneNumber">Phone Number</option>
                <option value="createdby">Created By</option>
            </select>
            
            <input className="bg-[#2D3681] rounded px-2 py-2 text-sm"
                type="text"
                value={searchKeyword} placeholder="Your keyword.."
                onChange={handleKeywordChange}
            />
          </div>
          <button
            onClick={() => setShowAddUserModal(!showAddUserModal)}
            className={`flex text-white text-xs bg-[#5A64C3] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center  `}
          >
            Add User
          </button>
        </div>
        <TableDashboard
          thList={[
            "User IC",
            "Full Name",
            "Email",
            "Phone Number",
            "Total Deposit",
            "Created by",
            role === roleType.masterAdmin ? "" : "Action",
          ]}
          tbList={filteredUserList}
          hideAction={role === roleType.masterAdmin ? true : false}
          handleDeposit={handleDepositModal}
          handleWithdrawl={handleWithdrawlModal}
        />
      </div>

      <div
        id="add-user-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          showAddUserModal ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New User
              </h3>
              <button
                onClick={() => setShowAddUserModal(!showAddUserModal)}
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
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                    })}
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="identityNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Identity Card Number
                  </label>
                  <input
                    {...register("identityNumber", {
                      required: "IC number is required",
                    })}
                    type="text"
                    name="identityNumber"
                    id="identityNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Identity Card Number"
                    required
                  />
                  {errors.identityNumber && (
                    <p className="text-red-600 text-sm">
                      {errors.identityNumber.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Password"
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
                Add new user
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
