
type Props = {
  thList: string[];
  tbList: any[];
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
          {props.tbList.map((tbItem, idx) => (
            <tr key={idx} className="text-center">
              <th
                key={idx}
                scope="row"
                className="p-2 font-medium  whitespace-pre-line "
              >
                {tbItem.date.replace(" ", "\n")}
              </th>
              <td className="px-py-4">{tbItem.code}</td>
              {props.type !== "withdrawal" && (
                <td className="px-py-4">{tbItem.tenure}</td>
              )}
              {tbItem.endDate !== null && props.type !== "withdrawal" && (
                <td className="p-2 whitespace-pre-line">
                  {tbItem.endDate.replace(" ", "\n")}
                </td>
              )}
              <td className="px-py-4">{tbItem.plan}</td>
              <td className="px-py-4">{tbItem.interest}</td>
              <td className="px-py-4">{tbItem.amount}</td>
              <td className="px-py-4">{tbItem.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
