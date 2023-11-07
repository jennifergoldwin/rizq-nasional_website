import { assetsAllocation } from "@/utils/dummy";

const AssetsAllocation = () => {
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
            <tr className="border-b border-[#5A64C3]/[0.4]">
              <th scope="row" className="p-2 font-medium">
                {1}
              </th>
              <td className="px-2 py-5">{"Forex"}</td>
              <td className={`p-2 text-[#4DC2E8] w-[50%]`}>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-[#4DC2E8]/[0.4] rounded-full h-2.5">
                    <div
                      className="bg-[#4DC2E8] h-2.5 rounded-full  w-[5.7%]"
                      style={{ filter: "drop-shadow(1px 1px 5px #4DC2E8)" }}
                    ></div>
                  </div>
                  5.7%
                </div>
              </td>
            </tr>
            <tr className="border-b border-[#5A64C3]/[0.4]">
              <th scope="row" className="p-2 font-medium">
                {2}
              </th>
              <td className="px-2 py-5">{"Gold"}</td>
              <td className={`p-2 text-[#53CF60] w-[50%]`}>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-[#53CF60]/[0.4] rounded-full h-2.5 ">
                    <div
                      className="bg-[#53CF60] h-2.5 rounded-full  w-[22.9%]"
                      style={{ filter: "drop-shadow(1px 1px 5px #53CF60)" }}
                    ></div>
                  </div>
                  22.9%
                </div>
              </td>
            </tr>
            <tr className="border-b border-[#5A64C3]/[0.4]">
              <th scope="row" className="p-2 font-medium">
                {3}
              </th>
              <td className="px-2 py-5">{"Crytocurrencies"}</td>
              <td className={`p-2 text-[#AF80F4] w-[50%]`}>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-[#AF80F4]/[0.4] rounded-full h-2.5 ">
                    <div
                      className=" bg-[#AF80F4] h-2.5 rounded-full  w-[17%]"
                      style={{ filter: "drop-shadow(1px 1px 5px #AF80F4)" }}
                    ></div>
                  </div>
                  17.0%
                </div>
              </td>
            </tr>
            <tr className=" border-[#5A64C3]/[0.4] ">
              <th scope="row" className="p-2 font-medium">
                {4}
              </th>
              <td className="px-2 py-5  ">{"International Equities"}</td>
              <td className={`p-2 text-[#FE8C75] w-[50%]`}>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-[#FE8C75]/[0.4] rounded-full h-2.5 ">
                    <div
                      className="bg-[#FE8C75] h-2.5 rounded-full  w-[54.4%]"
                      style={{ filter: "drop-shadow(1px 1px 5px #FE8C75)" }}
                    ></div>
                  </div>
                  54.4%
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetsAllocation;
