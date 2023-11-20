"use client";
import DepositModal from "@/components/modal/deposit";
import WithdrawlModal from "@/components/modal/withdrawl";
import { Investment, Plan, UserInfoForAdmin } from "@/utils/model";
import React from "react";
import Cookies from "js-cookie";
import { cookiesAdmin } from "@/utils/constant";
import UpdateDepositModal from "@/components/modal/updateDeposit";

type Props = {
  thList: string[];
  tbList: UserInfoForAdmin[];
  // planList: Plan[];
  // stockList: Stocks[];
  handleDeposit: any;
  handleWithdrawl: any;
  handleUpdateDeposit: any;
  hideAction: boolean;
};

const TableDashboard = (props: Props) => {
  const [showDepositModal, setShowDepositModal] = React.useState(false);
  const [showWithdrawModal, setShowWithdrawlModal] = React.useState(false);
  const [showUpdateDepositModal, setShowUpdateDepositModal] =
    React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<UserInfoForAdmin>();
  const [investList, setInvestList] = React.useState<Investment[]>([]);
  React.useEffect(() => {
    if (selectedUser) {
      const token = Cookies.get(cookiesAdmin.token) || "";
      if (token != "") {
        fetchUserInvestment(token, selectedUser.identityNumber);
      }
    }
  }, [selectedUser]);

  const fetchUserInvestment = async (
    token: String,
    userIdentityNumber: String
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/investment/${userIdentityNumber}`,
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
        setInvestList(result);
      }
    } catch (error) {}
  };
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white/[0/5]">
          <tr className="text-center">
            {props.thList.map((item, idx) => (
              <th key={idx} scope="col" className="px-6 py-3">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.tbList.map((tbItem, idx) => (
            <tr
              key={idx}
              className="text-center border-b-[1px] border-gray-600"
            >
              <th
                key={idx}
                scope="row"
                className="p-2 font-medium  whitespace-pre-line "
              >
                {tbItem.identityNumber}
              </th>
              <td className="px-py-4">{tbItem.fullName}</td>
              <td className="px-py-4">{tbItem.email}</td>
              <td className="px-py-4">{tbItem.phoneNumber}</td>
              <td className="px-py-4">{`RM${
                tbItem.totalDeposit !== undefined ? tbItem.totalDeposit : "0.0"
              }`}</td>
              <td className="px-py-4">{tbItem.createdby}</td>
              <td className={`px-py-4 ${props.hideAction ? "hidden" : ""}`}>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedUser(tbItem);
                      setShowDepositModal(!showDepositModal);
                    }}
                    className={`flex my-2 text-white bg-[#5A64C3] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center `}
                  >
                    Deposit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(tbItem);
                      setShowWithdrawlModal(!showWithdrawModal);
                    }}
                    className={`${
                      tbItem.totalDeposit < 1 ||
                      tbItem.totalDeposit === undefined
                        ? "hidden"
                        : "flex"
                    } text-white my-2 bg-[#53CF60] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center`}
                  >
                    Withdrawl
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(tbItem);
                      setShowUpdateDepositModal(!showUpdateDepositModal);
                    }}
                    className={`${
                      tbItem.totalDeposit < 1 ||
                      tbItem.totalDeposit === undefined
                        ? "hidden"
                        : "flex"
                    } text-white my-2 bg-[#FE8C75] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center`}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DepositModal
        showDepositModal={showDepositModal}
        setShowDepositModal={setShowDepositModal}
        handleDepositModal={props.handleDeposit}
        selectedUser={selectedUser}
      />

      <WithdrawlModal
        investList={investList}
        handleWithdrawlModal={props.handleWithdrawl}
        showWithdrawModal={showWithdrawModal}
        setShowWithdrawlModal={setShowWithdrawlModal}
      />

      <UpdateDepositModal
        investList={investList}
        handleUpdateDepositModal={props.handleUpdateDeposit}
        showUpdateDepositModal={showUpdateDepositModal}
        setShowUpdateDepositModal={setShowUpdateDepositModal}
      />
    </div>
  );
};

export default TableDashboard;
