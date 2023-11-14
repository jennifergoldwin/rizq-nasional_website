"use client";
import { Admin, Stocks } from "@/utils/model";
import React from "react";
type Props = {
    thList: string[];
    tbList: Admin[];
  };
  
  const TableAdmin = (props: Props) => {
    React.useEffect(()=>{
      console.log(props.tbList)
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
            {props.tbList.map((tbItem, idx) => (
              <tr key={idx} className="text-center">
                <th
                  key={idx}
                  scope="row"
                  className="p-2 font-medium  whitespace-pre-line "
                >
                  {tbItem.fullName}
                </th>
                <td className="px-py-4">{tbItem.username}</td> 

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TableAdmin;
  