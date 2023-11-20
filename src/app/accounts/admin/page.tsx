"use client";
import TableAdmin from "@/components/admin/tableAdmin";
import TableDashboard from "@/components/admin/tableDashboard";
import { Admin } from "@/utils/model";
import React from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { cookiesAdmin } from "@/utils/constant";
import { useRouter } from "next/navigation";
interface AddAdminForm {
  fullName: string;
  username: string;
  password: string;
}

const Page = () => {
  const [showAddAdminModal, setshowAddAdminModal] = React.useState(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<AddAdminForm>();
  const router = useRouter();
  const [adminList, setAdminList] = React.useState<Admin[]>([]);
  const [isEditAdmin, setIsEditAdmin] = React.useState(false);
  const [editAdmin, setEditAdmin] = React.useState<Admin>();

  React.useEffect(() => {
    const username = Cookies.get(cookiesAdmin.username) || "";
    const token = Cookies.get(cookiesAdmin.token) || "";
    if (username !== "" && token != "") {
      fetchAdmin(username, token);
    } else {
      setTimeout(() => router.replace("/login-admin"), 2000);
    }
  }, []);

  const fetchAdmin = async (username: string, token: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/listadmin/${username}`,
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
        setAdminList((prevAdminList) => [...result]);
      }
      //   showToast(message, !error);
    } catch (error: any) {}
  };

  const deleteAdmin = async (data: Admin) => {
    try {
      const token = Cookies.get(cookiesAdmin.token) || "";
      const username = Cookies.get(cookiesAdmin.username) || "";
      if (token === "" || username === "") return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/delete-admin`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const { error, message, result } = await response.json();

      if (!error) {
        // setShowPriceModal(!showPriceModal);
        fetchAdmin(username, token);
      }
      //   showToast(message, !error);
    } catch (error: any) {}
  };

  const updateAdmin = async (data: Admin) => {
    try {
      const token = Cookies.get(cookiesAdmin.token) || "";
      const username = Cookies.get(cookiesAdmin.username) || "";
      if (token === "" || username === "") return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/update-admin`,
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
      console.log(message);
      if (!error) {
        // setShowPriceModal(!showPriceModal);
        setshowAddAdminModal(false);
        fetchAdmin(username, token);
      }
      //   showToast(message, !error);
    } catch (error: any) {}
  };

  const onSubmit = async (data: AddAdminForm) => {
    if (isEditAdmin) {
      let a = editAdmin;
      if (a) {
        (a.fullName = data.fullName),
          (a.password = data.password),
          (a.username = data.username);
        updateAdmin(a);
      }
    } else {
      try {
        const us = Cookies.get(cookiesAdmin.username) || "";
        if (us === "") {
          return;
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/auth/register-admin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullName: data.fullName,
              username: data.username,
              password: data.password,
              role: "ROLE_ADMIN",
              createdby: us,
            }),
          }
        );

        const { error, message, result } = await response.json();

        if (!error) {
          setshowAddAdminModal(!showAddAdminModal);
          setAdminList((prevAdminList) => [...result]);
        }
        //   showToast(message, !error);
      } catch (error: any) {
        setError("password", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  const handleDelete = (value: any) => {
    deleteAdmin(value);
  };

  const handleUpdate = (value: Admin) => {
    setIsEditAdmin(true);
    setEditAdmin(value);
    setValue("fullName", value.fullName);
    setValue("username", value.username);

    setshowAddAdminModal(true);
  };

  return (
    <main className="min-h-screen md:pl-64 w-full">
      <div className="max-w-full mx-auto h-full w-full">
        <div className="flex justify-end mx-12">
          <button
            onClick={() => {
              setValue("fullName", "");
              setValue("username", "");
              setValue("password", "");
              setIsEditAdmin(false);
              setshowAddAdminModal(!showAddAdminModal);
            }}
            className={`flex text-white text-xs bg-[#5A64C3] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center mb-4 `}
          >
            Add Admin
          </button>
        </div>
        <TableAdmin
          thList={["Full Name", "Username", "Action"]}
          tbList={adminList}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>

      <div
        id="add-admin-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          showAddAdminModal ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isEditAdmin ? "Edit Admin" : "Create New Admin"}
              </h3>
              <button
                onClick={() => setshowAddAdminModal(!showAddAdminModal)}
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
                  {errors.fullName && (
                    <p className="text-red-600 text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    {...register("username", {
                      required: "Username is required",
                    })}
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Username"
                    required
                    readOnly={isEditAdmin}
                  />
                  {errors.username && (
                    <p className="text-red-600 text-sm">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
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
                  {errors.password && (
                    <p className="text-red-600 text-sm">
                      {errors.password.message}
                    </p>
                  )}
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
                {isEditAdmin ? "Edit admin" : "Add new admin"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
