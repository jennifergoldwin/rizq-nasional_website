import { Plan } from "@/utils/model";

type Props = {
    thList: string[];
    tbList: Plan[];
    handleDelete: any;
  };
  
  const TableStocks = (props: Props) => {
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
              <tr key={idx} className="text-center border-b-[1px] border-gray-500">
                <th
                  key={idx}
                  scope="row"
                  className="p-2 font-medium  whitespace-pre-line "
                >
                  {tbItem.id}
                </th>
                <td className="px-py-4">{tbItem.planType}</td> 
                <td className="px-py-4">{`${tbItem.tenure} days`}</td>
                <td className="px-py-4">{`${parseFloat(tbItem.interest.toString())*100}%`}</td>
                <td className="px-py-4">{`RM${tbItem.price}`}</td>
                <td className="px-py-4 flex justify-center">
                    <button onClick={()=>props.handleDelete(tbItem)} className={`flex my-2 text-white bg-[#53CF60] border-white border-[1px] rounded-[4px] py-2 px-3  font-bold justify-center`}>
                        Delete Plan
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TableStocks;
  