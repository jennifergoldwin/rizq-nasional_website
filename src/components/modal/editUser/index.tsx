"use client";
import { UserInfoForAdmin } from "@/utils/model";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
interface Props {
  selectedUser: UserInfoForAdmin | undefined;
  showEditUserModal: boolean;
  setShowEditUserModal: any;
  handleEditUser: any;
}
interface FormValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  identityNumber: string;
  password: string;
  remark: string;
  registrationDate: string;
}
const EditUserModal = (props: Props) => {
  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const bodyUser = {
      id: props.selectedUser?.id,
      identityNumber: data.identityNumber,
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      remark: data.remark,
      registrationDate: props.selectedUser?.registrationDate===null?data.registrationDate===""?null:data.registrationDate:props.selectedUser?.registrationDate
    };
    props.setShowEditUserModal(!props.showEditUserModal);
    props.handleEditUser(bodyUser);
    console.log(data.registrationDate)
    setValue("email", "");
    setValue("fullName", "");
    setValue("phoneNumber", "");
    setValue("identityNumber", "");
    setValue("password", "");
    setValue("remark", "");
    setValue("registrationDate", "");
  };
  React.useEffect(() => {
    if (props.selectedUser) {
      setValue("email", props.selectedUser.email);
      setValue("fullName", props.selectedUser.fullName);
      setValue("phoneNumber", props.selectedUser.phoneNumber);
      setValue("identityNumber", props.selectedUser.identityNumber);
      setValue("remark", props.selectedUser.remark);
      if (props.selectedUser.registrationDate!==null){
        setValue("registrationDate", props.selectedUser.registrationDate.replace("T"," "))
      }else{
        setValue("registrationDate","")
      }
    }
  }, [props.selectedUser]);
  return (
    <div
      id="add-admin-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        props.showEditUserModal ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit User
            </h3>
            <button
              onClick={() =>
                props.setShowEditUserModal(!props.showEditUserModal)
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
                  id="fullNameEdit"
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
                  htmlFor="emailUser"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  type="text"
                  name="email"
                  id="emailUserEdit"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Email"
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
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
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumberEdit"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Phone number"
                  required
                />
                {errors.phoneNumber && (
                  <p className="text-red-600 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="identityNumberEdit"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Identity Number
                </label>
                <input
                  {...register("identityNumber", {
                    required: "Identity number is required",
                  })}
                  type="text"
                  name="identityNumber"
                  id="identityNumberEdit"
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
                  id="passwordEdit"
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
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="remark"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Remark
                </label>
                <input
                  {...register("remark", {
                    required: "Remark is required",
                  })}
                  type="text"
                  name="remark"
                  id="remarkEdit"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Remark"
                  required
                />
                {errors.remark && (
                  <p className="text-red-600 text-sm">
                    {errors.remark.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="registrationDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Registration Date
                </label>
                <input
                  {...register("registrationDate",{required:false})}
                  type={props.selectedUser?.registrationDate!==null?"text":"datetime-local"}
                  name="registrationDate"
                  id="registrationDateEdit"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Registration Date"
                  // required={props.selectedUser?.registrationDate===null}
                  readOnly={props.selectedUser?.registrationDate!==null}
                  
                />
                {errors.registrationDate && (
                  <p className="text-red-600 text-sm">
                    {errors.registrationDate.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-[#5A64C3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#5A64C3] dark:focus:ring-blue-800"
            >
              Edit user
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
