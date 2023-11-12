import { assetsAllocation } from "@/utils/dummy";

interface StockAllocation {
  stockId: string;
  stockName: string;
  totalPurchasedPrice: number;
}

interface AssetsAllocationProps {
  data: StockAllocation[]; // Expecting an array of StockAllocation
}

const stockColors = ['#4DC2E8', '#53CF60', '#AF80F4', '#FE8C75'];

const AssetsAllocation: React.FC<AssetsAllocationProps> = ({ data }) => {

  const totalPurchasedPrice = data.reduce((total, stock) => total + stock.totalPurchasedPrice, 0);

  return (
    <div className=" bg-[#01115E] px-8 py-6 rounded-xl h-full">
      <h1 className="text-center text-xl font-semibold pb-8 pt-4">
        Assets Allocation
      </h1>
      <div className="relative overflow-x-auto ">
        <table className="w-full text-left">
          <thead className="border-b border-[#5A64C3]/[0.4] !font-light text-white/[0.5]">
            <tr>
              <th scope="col" className="p-2">
                #
              </th>
              <th scope="col" className="p-2">
                Type
              </th>
              <th scope="col" className="p-2">
                Allocation
              </th>
            </tr>
          </thead>
          <tbody>
          {data.map((stock, index) => {
               const colorIndex = index % stockColors.length;
               const color = stockColors[colorIndex];
              return (
                <tr key={index} className="border-b border-[#5A64C3]/[0.4]">
                  <th scope="row" className="p-2 font-medium">
                    {index + 1}
                  </th>
                  <td className="px-2 py-5">{stock.stockName}</td>
                  <td className={`p-2 text-white w-[50%]`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-full bg-[${color}]/[0.4] rounded-full h-2.5`}>
                        <div
                          className={`bg-[${color}] h-2.5 rounded-full`}
                          style={{
                            width: `${(stock.totalPurchasedPrice / totalPurchasedPrice) * 100}%`,
                          }}
                        ></div>
                      </div>
                      {((stock.totalPurchasedPrice / totalPurchasedPrice) * 100).toFixed(1)}%
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetsAllocation;
