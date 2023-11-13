import { UserInfoForAdmin } from "@/utils/model";

type Props = {
    thList: string[];
    tbList: UserInfoForAdmin[];
    handleDeposit:any;
    handleWithdrawl:any;
  };
  
  const TableDashboard = (props: Props) => {
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
                  {tbItem.identityNumber}
                </th>
                <td className="px-py-4">{tbItem.fullName}</td> 
                <td className="px-py-4">{tbItem.email}</td>
                <td className="px-py-4">{tbItem.phoneNumber}</td>
                <td className="px-py-4">{tbItem.totalDeposit}</td>
                <td className="px-py-4">{tbItem.createdBy}</td>
                <td className="px-py-4">
                    <div className="flex gap-2">
                        <button onClick={()=>props.handleDeposit(tbItem)} className={`flex text-white bg-[#5A64C3] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center `}>
                            Deposit
                        </button>
                        <button onClick={()=>props.handleWithdrawl(tbItem)} className={`flex text-white bg-[#53CF60] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center`}>
                            Withdrawl
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
  
  export default TableDashboard;
  