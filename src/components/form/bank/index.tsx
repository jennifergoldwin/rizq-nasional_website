"use client";
import React from "react";
import { ProfileData } from "@/interface/profiles";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

interface BankDetailsProps {
  profile: ProfileData | undefined;
  handleUpdate: any;
}

type FormValues = {
  bankName: string;
  bankAccountNumber: string;
  bankHolderName: string;
};

const BankDetails: React.FC<BankDetailsProps> = ({ profile, handleUpdate }) => {
  const [selectedOption, setSelectedOption] = React.useState("");
  const [isEdit, setIsEdit] = React.useState(false);
  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const t = useTranslations("Overview.Account.BankDetails");
  React.useEffect(() => {
    // Update selectedOption when data changes
    if (profile?.bankName !== undefined) {
      setSelectedOption(profile.bankName.toLowerCase());
    }
  }, [profile]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (profile) {
      let u = profile;
      u.bankName = selectedOption;
      u.bankAccountNumber = data.bankAccountNumber;
      u.bankHolderName = data.bankHolderName;

      handleUpdate(u);
      setIsEdit(false);
    }
  };
  return (
    <div className="mx-6 bg-[#01115E] px-8 py-6 rounded-xl my-6">
      <h1 className="font-bold text-xl pb-4">{t("title")}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center my-4 w-full">
          <label htmlFor="dropdown_bank_name" className="w-2/5">
            {t("bankName")}
          </label>
          <select
            id="dropdown_bank_name"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            value={selectedOption}
            disabled={!isEdit}
            onChange={handleSelect}
          >
            <option value="">{t("bankName")}</option>
            <option value="OCBC">OCBC</option>
            <option value="Maybank">Maybank</option>
            <option value="UOB">UOB</option>
            <option value="DBS">DBS</option>
          </select>
        </div>
        <div className="flex items-center my-4 w-full">
          <label htmlFor="account_number" className="w-2/5">
            {t("accountNumber")}
          </label>
          <input
            {...register("bankAccountNumber", {
              required: "Account number is required",
            })}
            type="text"
            disabled={!isEdit}
            id="account_number"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            defaultValue={profile?.bankAccountNumber}
          />
        </div>
        <div className="flex items-center my-4 w-full">
          <label htmlFor="holder_name" className="w-2/5">
            {t("holderName")}
          </label>
          <input
            type="text"
            id="holder_name"
            disabled={!isEdit}
            {...register("bankHolderName", {
              required: "Holder name is required",
            })}
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            defaultValue={profile?.bankHolderName}
          />
        </div>

        <div className="flex w-full justify-end">
          {isEdit ? (
            <div className="flex">
              <button
                onClick={() => setIsEdit(false)}
                className="border-[#A169F2] text-[#A169F2] rounded-lg border-[2px] py-2 px-4 mr-4"
              >
                {t("discard")}
              </button>
              <button
                type="submit"
                className="text-white bg-[#5A64C3] border-white border-[2px] rounded-lg py-2 px-6"
              >
                {t("save")}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEdit(!isEdit)}
              className="text-white bg-[#5A64C3] border-white border-[2px] rounded-lg py-2 px-6"
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BankDetails;
