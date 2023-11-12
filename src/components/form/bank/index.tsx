"use client";
import React from "react";
import { BankData } from "@/interface/profiles";

interface BankDetailsProps {
  data: BankData | null;
}

const BankDetails: React.FC<BankDetailsProps> = ({ data }) => {
  const [selectedOption, setSelectedOption] = React.useState('');

  React.useEffect(() => {
    // Update selectedOption when data changes
    if (data?.bankName !== undefined) {
      setSelectedOption(data.bankName.toLowerCase());
    }
  }, [data]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className="mx-6 bg-[#01115E] px-8 py-6 rounded-xl my-6">
      <h1 className="font-bold text-xl pb-4">Bank Details</h1>
      <form>
        <div className="flex items-center my-4 w-full">
          <label htmlFor="dropdown_bank_name" className="w-2/5">
            Bank Name
          </label>
          <select
            id="dropdown_bank_name"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            value={selectedOption}
            onChange={handleSelect}
          >
            <option value="">Select Bank</option>
            <option value="ocbc">OCBC</option>
            <option value="maybank">Maybank</option>
            <option value="uob">UOB</option>
            <option value="dbs">DBS</option>
          </select>
        </div>
        <div className="flex items-center my-4 w-full">
          <label htmlFor="account_number" className="w-2/5">
            Account Number
          </label>
          <input
            type="text"
            id="account_number"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            defaultValue={data?.bankAccountNumber}
          />
        </div>
        <div className="flex items-center my-4 w-full">
          <label htmlFor="holder_name" className="w-2/5">
            Holder Name
          </label>
          <input
            type="text"
            id="holder_name"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            defaultValue={data?.bankHolderName}
          />
        </div>

        <div className="flex w-full justify-end">
          <div className="flex">
            <button className="border-[#A169F2] text-[#A169F2] rounded-lg border-[2px] py-2 px-4 mr-4">
              Discard
            </button>
            <button className="text-white bg-[#5A64C3] border-white border-[2px] rounded-lg py-2 px-6">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BankDetails;
