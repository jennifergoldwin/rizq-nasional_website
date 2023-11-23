"use client";
import TableDashboard from "@/components/admin/tableDashboard";
import TableStocks from "@/components/admin/tableStocks";
// import { Stocks } from "@/utils/model";
import React from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { cookiesAdmin } from "@/utils/constant";
import { Plan } from "@/utils/model";

interface AddPlanForm {
  id: string;
  planType: string;
  interest: string;
  tenure: string;
  price: string;
}

const Page = () => {
  // const [showPriceModal, setShowPriceModal] = React.useState(false);
  const [showAddPlanModal, setShowAddPlanModal] = React.useState(false);
  // const [updateStock, setUpdateStock] = React.useState<Stocks>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AddPlanForm>();

  const router = useRouter();
  const [planList, setPlanList] = React.useState<Plan[]>([]);

  React.useEffect(() => {
    const token = Cookies.get(cookiesAdmin.token) || "";
    if (token !== "") {
      fetchPlan(token);
    } else {
      setTimeout(() => router.replace("/admin"), 2000);
    }
  }, []);

  const fetchPlan = async (token: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/all-plan`,
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
        setPlanList((prevList) => [...result]);
      }
      //   showToast(message, !error);
    } catch (error: any) {}
  };

  const handleDelete = (value: Plan) => {
    onDeletePlan(value);
    // setUpdateStock(value);
    // setShowPriceModal(!showPriceModal);
  };

  const onDeletePlan = async (data: Plan) => {
    try {
      const token = Cookies.get(cookiesAdmin.token) || "";
      if (token === "") return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/delete-plan`,
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
        setPlanList((prevList) => [...result]);
      }
      //   showToast(message, !error);
    } catch (error: any) {}
  };

  const onSubmit = async (data: AddPlanForm) => {
    data.interest = (parseFloat(data.interest) / 100).toString();

    try {
      const token = Cookies.get(cookiesAdmin.token) || "";
      if (token === "") return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/add-plan`,
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

      if (!error) {
        setShowAddPlanModal(!setShowAddPlanModal);
        setPlanList((prevList) => [...prevList, result]);
      }
      //   showToast(message, !error);
    } catch (error: any) {}
  };

  return (
    <main className="min-h-screen md:pl-64 w-full">
      <div className="max-w-full mx-auto h-full w-full">
        <div className="flex justify-end mx-12">
          <button
            onClick={() => setShowAddPlanModal(!showAddPlanModal)}
            className={`flex text-white text-xs bg-[#5A64C3] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center mb-4 `}
          >
            Add Plan
          </button>
        </div>
        <TableStocks
          thList={["Plan Id", "Plan Type", "Tenure", "Interest", "Price"]}
          tbList={planList}
          handleDelete={handleDelete}
        />
      </div>

      {/* <div
        id="update-price-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          showPriceModal ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Price
              </h3>
              <button
                onClick={() => setShowPriceModal(!showPriceModal)}
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
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="updatePrice"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Update Stock Price
                  </label>
                  <input
                    onChange={(e: any) => {
                      let temp = updateStock;
                      temp!.currPrice = parseInt(e.target.value);
                    }}
                    defaultValue={updateStock?.currPrice}
                    type="number"
                    name="updatePrice"
                    id="updatePrice"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Stock Price"
                    required
                  />
                </div>
              </div>
              <button
                onClick={() => onUpdatePrice(updateStock!)}
                type="submit"
                className="text-white inline-flex items-center bg-[#5A64C3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#5A64C3] dark:focus:ring-blue-800"
              >
                Update price
              </button>
            </form>
          </div>
        </div>
      </div> */}

      <div
        id="add-stocks-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          showAddPlanModal ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Stock
              </h3>
              <button
                onClick={() => setShowAddPlanModal(!showAddPlanModal)}
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
                    htmlFor="stockId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Plan Id
                  </label>
                  <input
                    {...register("id", { required: "Stock id is required" })}
                    type="text"
                    name="id"
                    id="id"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Stock Id"
                    required
                  />
                  {errors.id && (
                    <p className="text-red-600 text-sm">{errors.id.message}</p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="planType"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Plan Type
                  </label>
                  <input
                    {...register("planType", {
                      required: "Stock name is required",
                    })}
                    type="text"
                    name="planType"
                    id="planType"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Plan Type"
                    required
                  />
                  {errors.planType && (
                    <p className="text-red-600 text-sm">
                      {errors.planType.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="tenure"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tenure
                  </label>
                  <input
                    {...register("tenure", {
                      required: "Stock price is required",
                    })}
                    type="number"
                    name="tenure"
                    id="tenure"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tenure"
                    required
                  />
                  {errors.tenure && (
                    <p className="text-red-600 text-sm">
                      {errors.tenure.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="interest"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Interest (in % ex: 60 )
                  </label>
                  <input
                    {...register("interest", {
                      required: "Stock price is required",
                    })}
                    type="number"
                    name="interest"
                    id="interest"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Interest"
                    required
                  />
                  {errors.interest && (
                    <p className="text-red-600 text-sm">
                      {errors.interest.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    {...register("price", {
                      required: "Stock price is required",
                    })}
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Price"
                    required
                  />
                  {errors.price && (
                    <p className="text-red-600 text-sm">
                      {errors.price.message}
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
                Add new plan
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
