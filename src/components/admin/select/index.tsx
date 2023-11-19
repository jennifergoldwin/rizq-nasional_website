"use client";
import React from "react";
import { UserInfoForAdmin } from "@/utils/model";
import Select from "react-select";
type Props = {
  userList: UserInfoForAdmin[];
  setSelectedUser: any;
};
const SelectUser = (props: Props) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => setIsMounted(true), []);
  return isMounted ? (
    <Select
      className="text-black"
      options={props.userList.map((user) => ({
        value: user.identityNumber,
        label: user.fullName,
      }))}
      isSearchable
      required
      placeholder="Search for a user..."
      onChange={(selectedOption) => {
        // Handle selected option
        if (selectedOption) {
          props.setSelectedUser(selectedOption.value);
        }
      }}
      filterOption={(option, rawInput) => {
        const inputValue = rawInput.trim().toLowerCase();
        const userLabel = option.label.toLowerCase();

        // Check if the user's name starts with the input value
        return userLabel.startsWith(inputValue);
      }}
    />
  ) : null;
};

export default SelectUser;
