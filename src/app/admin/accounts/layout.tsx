import SidebarAdmin from "@/components/admin/sidebarAdmin/SidebarAdmin";
import TopBarAdmin from "@/components/admin/topbarAdmin";
import TopBar from "@/components/topbar";
import { useLocale } from "next-intl";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const layout = (props: Props) => {
  return (
    <div className="flex flex-col mx-auto w-full">
      <SidebarAdmin />
      <TopBarAdmin />
      {props.children}
    </div>
  );
};

export default layout;
