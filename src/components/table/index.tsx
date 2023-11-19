"use client"
import { Statement } from "@/utils/model";
import React from 'react'
import EditStatementModal from "../modal/editStatement";
type Props = {
  thList: string[];
  tbList: Statement[];
  type: string;
  handleEditStatement: any;
};

const Table = (props: Props) => {
  const [selectedStatement, setSelectedStatement] = React.useState<Statement>();
  const [showEditStatementModal, setShowEditStatementModal] = React.useState(false);
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
            <tr key={idx} className="text-center">
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
                {tbItem.date}
              </th>
              <td className="px-py-4">{tbItem.product}</td>
              
              <td className="px-py-4">{tbItem.leverage}</td>
              <td className="px-py-4">{tbItem.profitLoss}</td>
              {props.type === "admin" && (
                <td className="px-py-4">
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
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <EditStatementModal handleEditStatement={props.handleEditStatement} selectedStatement={selectedStatement} setShowEditStatementModal={setShowEditStatementModal} showEditStatementModal={showEditStatementModal}/>
    </div>
  );
};

export default Table;
