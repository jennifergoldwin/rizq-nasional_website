"use client";
import TableAdmin from "@/components/admin/tableAdmin";
import TableDashboard from "@/components/admin/tableDashboard";
import { Admin } from "@/utils/model";
import React from "react";

const Page = () =>{
    const [showAddAdminModal, setshowAddAdminModal] = React.useState(false);

    return(
        <main className="min-h-screen md:pl-64 w-full">
            <div className="max-w-full mx-auto h-full w-full">
                <div className="flex justify-end mx-12">
                    <button onClick={()=>setshowAddAdminModal(!showAddAdminModal)} 
                        className={`flex text-white text-xs bg-[#5A64C3] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center mb-4 `}>
                        Add Admin
                    </button>
                </div>
                <TableAdmin
                    thList={[
                    "Full Name",
                    "Username",
                    "Password",
                    ]}
                    tbList={[{fullName: "Girna",username:"gina123",password:"12345"}]}
                   
              />
            </div>

            <div id="add-admin-modal" tabIndex={-1} aria-hidden="true" className={`${showAddAdminModal?"flex":"hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Create New Admin
                            </h3>
                            <button onClick={()=>setshowAddAdminModal(!showAddAdminModal)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form  className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                    <input type="text" name="fullName" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Full Name" required/>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Username" required/>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Password" required/>
                                </div>
            
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-[#5A64C3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#5A64C3] dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Add new admin
                            </button>
                        </form>
                    </div>
                </div>
            </div> 

        </main>
    )
}

export default Page;