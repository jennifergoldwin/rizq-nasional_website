"use client";
import { Admin } from "@/utils/model";
import React from "react";
type Props = {
  thList: string[];
  tbList: Admin[];
  handleDelete: any;
  handleUpdate: any;
};

const TableAdmin = (props: Props) => {
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
              <td className="px-py-4">
                <div className="flex gap-2 items-center justify-center">
                  <button
                    onClick={() => props.handleUpdate(tbItem)}
                    className={` text-white my-2 bg-[#53CF60] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => props.handleDelete(tbItem)}
                    className={` text-white my-2 bg-[#FE8C75] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center`}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAdmin;
