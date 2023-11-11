"use client";
import Table from "@/components/table";
import { depositData, withdrawlData } from "@/utils/dummy";
import React from "react";

export default function Page() {
  const [activeTable, setActiveTable] = React.useState(0);
  return (
    <main className="min-h-screen md:pl-64 w-full">
      <div className="max-w-full mx-auto w-full h-full">
        <div className="bg-[#01115E] rounded-xl py-8 ml-6 mr-8">
          <div className="grid grid-cols-2 gap-8 pb-8">
            <button
              className={`${
                activeTable === 0 ? "text-[#4DC2E8]" : "text-white"
              }`}
              onClick={() => setActiveTable(0)}
            >
              Investment Deposit
            </button>
            <button
              className={`${
                activeTable === 1 ? "text-[#4DC2E8]" : "text-white"
              }`}
              onClick={() => setActiveTable(1)}
            >
              Investment Withdrawal
            </button>
          </div>
          <div className="ml-4 mr-8">
            {activeTable === 0 ? (
              <Table
                thList={[
                  "Date",
                  "Code",
                  "Tenure (day)",
                  "End Date",
                  "Plan",
                  "Interest",
                  "Amount",
                  "Status",
                ]}
                tbList={depositData}
                type={""}
              />
            ) : (
              <Table
                thList={[
                  "Date",
                  "Code",
                  "Plan",
                  "Interest",
                  "Amount",
                  "Status",
                ]}
                tbList={withdrawlData}
                type={""}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
