"use client";
import { Statement } from "@/utils/model";
import React from "react";
import EditStatementModal from "../modal/editStatement";
import { formatToMYR } from "@/utils/constant";
import DialogDelete from "../modal/delete";

type Props = {
  thList: string[];
  tbList: Statement[];
  type: string;
  handleDeleteStatement: any;
  handleEditStatement: any;
};

const Table = (props: Props) => {
  const [selectedStatement, setSelectedStatement] = React.useState<Statement>();
  const [showEditStatementModal, setShowEditStatementModal] =
    React.useState(false);
  const [isDialogOpen,setIsDialogOpen] = React.useState(false);

  React.useEffect(()=>{
    console.log(props.handleDeleteStatement)
  })
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
          {props.tbList.map((tbItem: Statement, idx: number) => (
            <tr
              key={idx}
              className="text-center border-b-[1px] border-gray-500"
            >
              {props.type === "admin" && (
                <td className="px-py-4">{tbItem.userName}</td>
              )}
              {props.type === "admin" && (
                <td className="px-py-4">{tbItem.userIdentityNumber}</td>
              )}
              {/* {tbItem.endDate !== null && props.type !== "withdrawal" && (
                <td className="p-2 whitespace-pre-line">
                  {tbItem.endDate.replace(" ", "\n")}
                </td>
              )} */}
              <th
                key={idx}
                scope="row"
                className="p-2 font-medium  whitespace-pre-line "
              >
                {new Date(tbItem.date).toLocaleString("sv-SE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </th>
              <td className="px-py-4">{tbItem.product}</td>

              <td className="px-py-4">{tbItem.leverage}</td>
              <td
                className={`${
                  parseInt(tbItem.profitLoss) > 0
                    ? "text-green-500"
                    : "text-red-500"
                } px-py-4`}
              >
                {parseInt(tbItem.profitLoss) > 0
                  ? `+${formatToMYR(parseInt(tbItem.profitLoss))}`
                  : `${formatToMYR(parseInt(tbItem.profitLoss))}`}
              </td>
              {props.type === "admin" && (
                <td className="px-py-4">
                  <div className="flex gap-2 justify-center items-center">
                    <button
                      onClick={() => {
                        setSelectedStatement(tbItem);
                        // setSelectedUser(tbItem);
                        setShowEditStatementModal(!showEditStatementModal);
                      }}
                      className={` text-white my-2 bg-[#53CF60] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStatement(tbItem);
                        setIsDialogOpen(!isDialogOpen);
                        // setSelectedUser(tbItem);
                        // setShowEditStatementModal(!showEditStatementModal);
                      }}
                      className={` text-white my-2 bg-[#fe8c75] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <EditStatementModal
        handleEditStatement={props.handleEditStatement}
        selectedStatement={selectedStatement}
        setShowEditStatementModal={setShowEditStatementModal}
        showEditStatementModal={showEditStatementModal}
      />

      <DialogDelete label="Are you sure you want to delete this statement?" isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} 
      handleDelete={()=>{
        if (selectedStatement){
          props.handleDeleteStatement(selectedStatement)
        }
        setIsDialogOpen(!isDialogOpen)
      }}/>


    </div>
  );
};

export default Table;
