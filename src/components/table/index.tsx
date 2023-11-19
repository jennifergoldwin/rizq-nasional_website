import { Statement } from "@/utils/model";

type Props = {
  thList: string[];
  tbList: Statement[];
  type: string;
};

const Table = (props: Props) => {
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
