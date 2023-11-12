"use client";
import Table from "@/components/table";
import { depositData, withdrawlData } from "@/utils/dummy";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { cookies } from "@/utils/constant";

interface Statement {
 date: string;
 code: string;
 plan: string;
 interest: string;
 amount: string;
 status: string;
 statusWithdrawal: string;
}

const fetchUserStatement = async (token:String, userIdentityNumber:String) => {
  try {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/statement/${userIdentityNumber}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    return null;
  }
};

export default function Page() {
  
  const [data, setData] = useState(null);
  const [dataWithdrawal, setDataWithdrawal] = useState(null);

  useEffect(() => {
    const userIdentityNumber = Cookies.get(cookies.identityNumber);
    const token = Cookies.get(cookies.token);
    if (token && userIdentityNumber){
      const fetchData = async () => {
        const data = await fetchUserStatement(token,userIdentityNumber);
        setData(data.result.statement);
        setDataWithdrawal(data.result.statement.filter((item: Statement) => item.statusWithdrawal === 'true'));
      };
  
      fetchData();
    }
    
  }, []);

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
                tbList={data || []}
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
                tbList={dataWithdrawal || []}
                type={"withdrawal"}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
