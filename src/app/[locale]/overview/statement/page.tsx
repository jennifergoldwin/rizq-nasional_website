"use client";
import Table from "@/components/table";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { cookies } from "@/utils/constant";
import { Statement } from "@/utils/model";
import { useTranslations } from "next-intl";

const fetchUserStatement = async (
  token: String,
  userIdentityNumber: String
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/statement-user/${userIdentityNumber}`,
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
  const [statementList, setStatementList] = useState<Statement[]>([]);
  const t = useTranslations("Overview.Statement");
  useEffect(() => {
    const userIdentityNumber = Cookies.get(cookies.identityNumber);
    const token = Cookies.get(cookies.token);

    if (token && userIdentityNumber) {
      const fetchData = async () => {
        const data = await fetchUserStatement(token, userIdentityNumber);
        setStatementList(data.result);
        // setDataWithdrawal(
        //   data.result.filter(
        //     (item: Statement) => item.statusWithdrawal === "true"
        //   )
        // );
      };

      fetchData();
    }
  }, []);

  return (
    <main className="min-h-screen md:pl-64 w-full">
      <div className="max-w-full mx-auto w-full h-full">
        <div className="bg-[#01115E] rounded-xl py-4 ml-6 mr-8">
          {/* <div className="grid grid-cols-2 gap-8 pb-8">
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
          </div> */}
          <div className="ml-4 mr-8">
            {statementList.length === 0 ? (
              <div className="text-center">No Data</div>
            ) : (
              <Table
                handleEditStatement={null}
                handleDeleteStatement={null}
                thList={[
                  t("date"),
                  t("product"),
                  t("leverage"),
                  t("profitLoss"),
                ]}
                tbList={statementList || []}
                type={""}
              />
            )}
            {/* {activeTable === 0 ? (
              <Table
                thList={[
                  "Date",
                  "Product",
                  "Leverage",
                  "Profit / Loss",
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
            )} */}
          </div>
        </div>
      </div>
    </main>
  );
}
