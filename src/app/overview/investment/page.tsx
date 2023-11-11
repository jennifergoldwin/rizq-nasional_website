import PlanCard from "@/components/plancard";

export default function Page() {
  const data = [
    {
      type: "Basic",
      period: 14,
      returns: "6500% (MYR 20,000)",
      withdrawl: "any",
      price: 100,
    },
    {
      type: "Standard",
      period: 14,
      returns: "3000% (MYR 30,000)",
      withdrawl: "any",
      price: 500,
    },
    {
      type: "Premium",
      period: 14,
      returns: "3500% (MYR 20,000)",
      withdrawl: "any",
      price: 1000,
    },
  ];
  return (
    <>
      <main className="min-h-screen md:pl-64 w-full">
        <div className="max-w-full mx-auto flex justify-center items-center h-full">
          <div className="bg-[#01115E] flex flex-col justify-center  px-8 py-8 rounded-3xl my-6 w-full mx-6">
            <h1 className="font-bold text-2xl text-center pb-4">
              Choose Your Plan
            </h1>
            <p className="text-center">
              Please contact our{" "}
              <a href="#" className="text-[#4DC2E8] underline">
                Customer Support{" "}
              </a>
              for more information about the investment
            </p>

            <div className="grid md:grid-cols-3 gap-8 py-4 grid-cols-1 justify-items-center items-center">
              {data.map((item) => (
                <PlanCard data={item} key={item.type} />
              ))}
            </div>
            <p className="text-white/[0.5] italic">
              All investments involve risk, including the possibility of losing
              the original investment.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
