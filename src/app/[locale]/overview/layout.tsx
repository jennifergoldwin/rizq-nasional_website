import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const layout = (props: Props) => {
  return (
    <div className="flex flex-col mx-auto w-full">
      <Sidebar />
      <TopBar />
      {props.children}
    </div>
  );
};

export default layout;
