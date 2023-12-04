"use client";
import DepositModal from "@/components/modal/deposit";
import WithdrawlModal from "@/components/modal/withdrawl";
import { Investment, Plan, Statement, UserInfoForAdmin } from "@/utils/model";
import React, { use } from "react";
import Cookies from "js-cookie";
import { cookiesAdmin, formatToMYR } from "@/utils/constant";
// import UpdateDepositModal from "@/components/modal/updateDeposit";
import StatementModal from "@/components/modal/updateDeposit";
import AddStatementModal from "@/components/modal/addStatement";
import EditUserModal from "@/components/modal/editUser";
import DialogDelete from "@/components/modal/delete";
import { useRouter } from "next/navigation";
type Props = {
  thList: string[];
  tbList: UserInfoForAdmin[];
  // planList: Plan[];
  // stockList: Stocks[];
  handleDeposit: any;
  handleWithdrawl: any;
  handleEditUser: any;
  handleDeleteUser: any;
  // handleUpdateDeposit: any;
  hideAction: boolean;
};
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

const TableDashboard = (props: Props) => {
  const [showDepositModal, setShowDepositModal] = React.useState(false);
  // const [showWithdrawModal, setShowWithdrawlModal] = React.useState(false);
  const [showStatementModal, setShowStatementModal] = React.useState(false);
  const [showAddStatementModal, setAddShowStatementModal] =
    React.useState(false);
  const [showEditUserModal, setShowEditUserModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<UserInfoForAdmin>();
  const [investList, setInvestList] = React.useState<Investment[]>([]);
  const [statementList, setStatementList] = React.useState<Statement[]>([]);
  const [isDialogOpen,setIsDialogOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (selectedUser) {
      const token = Cookies.get(cookiesAdmin.token) || "";
      const username = Cookies.get(cookiesAdmin.username) || "";
      if (token != "" || username != "") {
        fetchUserInvestment(token, selectedUser.identityNumber);
        const fetchData = async () => {
          const data = await fetchUserStatement(token, selectedUser.createdby);
          setStatementList(data.result);
        };
        fetchData();
      }
    }
  }, [selectedUser, showStatementModal]);

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
  const updateStatement = async (data: Statement) => {
    try {
      const token = Cookies.get(cookiesAdmin.token) || "";
      if (token === "") return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/update-statement`,
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

      if (!error) {
        // setShowPriceModal(!showPriceModal);
        setStatementList((prevList) => [...result]);
      }
      //   showToast(message, !error);
    } catch (error: any) {}
  };
  const deleteStatement = async (data: Statement) => {
    try {
      const token = Cookies.get(cookiesAdmin.token) || "";
      const username = Cookies.get(cookiesAdmin.username) || "";
      if (token === "" || username === "") return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/delete-statement`,
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

      // console.log(message)
      if (!error) {
        // setShowPriceModal(!showPriceModal);
        // setStatementList((prevList) => [...result]);
        // fetchUserStatement(token, username);
        if (selectedUser){
          fetchUserInvestment(token, selectedUser.identityNumber);
          const fetchData = async () => {
            const data = await fetchUserStatement(token, selectedUser.createdby);
            setStatementList(data.result);
          };
          fetchData();
        }
      }
      //   showToast(message, !error);
    } catch (error: any) {}
  };
  const addStatement = async (data: Statement) => {
    try {
      // console.log(data);
      const token = Cookies.get(cookiesAdmin.token) || "";
      const us = Cookies.get(cookiesAdmin.username) || "";
      if (us === "" || token === "") return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/add-statement`,
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
      console.log(message);
      // showToast(message, !error);
      if (!error) {
        if (selectedUser){
          fetchUserInvestment(token, selectedUser.identityNumber);
          const fetchData = async () => {
            const data = await fetchUserStatement(token, selectedUser.createdby);
            setStatementList(data.result);
          };
          fetchData();
        }
      }
    } catch (error: any) {}
  };

  const handleEditStatement = (value: Statement) => {
    updateStatement(value);
  };
  const handleDeleteStatement = (value: Statement) => {
    deleteStatement(value);
  };
  const handleAddStatement = (value: Statement) => {
    addStatement(value);
  };

  return (
    <div className="relative overflow-x-auto max-w-full">
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
              <td className="px-py-4">{`${
                tbItem.totalDeposit !== undefined
                  ? formatToMYR(tbItem.totalDeposit)
                  : formatToMYR(0)
              }`}</td>
              <td className="px-py-4">{`${
                tbItem.totalDeposit !== undefined
                  ? formatToMYR(tbItem.totalProfit)
                  : formatToMYR(0)
              }`}</td>
              <td className="px-py-4">{`${
                tbItem.totalDeposit !== undefined &&
                tbItem.totalProfit !== undefined
                  ? formatToMYR(
                      parseFloat(tbItem.totalDeposit.toString()) +
                        parseFloat(tbItem.totalProfit.toString())
                    )
                  : formatToMYR(0)
              }`}</td>
              <td className="px-py-4">{tbItem.createdby}</td>
              <td className={`px-py-4 `}>
                <div className="flex  items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedUser(tbItem);
                      setShowDepositModal(!showDepositModal);
                    }}
                    className={`${
                      props.hideAction ? "hidden" : ""
                    } text-xs text-white my-2 bg-[#4DC2E8] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(tbItem);
                      setShowStatementModal(!showStatementModal);
                    }}
                    className={`${
                      props.hideAction ? "hidden" : ""
                    } text-xs text-white my-2 bg-[#53CF60] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center`}
                  >
                    Statement
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(tbItem);
                      setShowEditUserModal(!showEditUserModal);
                      // setShowStatementModal(!showStatementModal);
                    }}
                    className={`text-xs text-white my-2 bg-[#AF80F4] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center`}
                  >
                    Edit User
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(tbItem);
                      setIsDialogOpen(!isDialogOpen)
                      
                      // setShowEditUserModal(!showEditUserModal);
                      // setShowStatementModal(!showStatementModal);
                    }}
                    className={`text-xs text-white my-2 bg-[#fe8c75] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center`}
                  >
                    Delete User
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DialogDelete note={"(All investment and statement history will be deleted)"} label="Are you sure you want to delete this user? " isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} handleDelete={()=>{
        props.handleDeleteUser(selectedUser?.identityNumber)
        setIsDialogOpen(!isDialogOpen)
      }}/>
      <DepositModal
        showDepositModal={showDepositModal}
        setShowDepositModal={setShowDepositModal}
        handleWithdrawalModal={props.handleWithdrawl}
        handleDepositModal={props.handleDeposit}
        selectedUser={selectedUser}
        investList={investList}
      />

      <EditUserModal
        selectedUser={selectedUser}
        showEditUserModal={showEditUserModal}
        setShowEditUserModal={setShowEditUserModal}
        handleEditUser={props.handleEditUser}
      />

      {/* <WithdrawlModal
        investList={investList}
        handleWithdrawlModal={props.handleWithdrawl}
        showWithdrawModal={showWithdrawModal}
        setShowWithdrawlModal={setShowWithdrawlModal}
      /> */}

      <StatementModal
        showAddStatementModal={showAddStatementModal}
        setShowAddStatementModal={setAddShowStatementModal}
        handleEditStatement={handleEditStatement}
        handleDeleteStatement={handleDeleteStatement}
        statementList={statementList || []}
        showStatementModal={showStatementModal}
        setShowStatementModal={setShowStatementModal}
        selectedUser={selectedUser}
      />

      <AddStatementModal
        handleAddStatement={handleAddStatement}
        userList={props.tbList}
        selectedUser={selectedUser}
        setShowAddStatementModal={setAddShowStatementModal}
        showAddStatementModal={showAddStatementModal}
        showStatementModal={showStatementModal}
        setShowStatementModal={setShowStatementModal}
      />
    </div>
  );
};

export default TableDashboard;
