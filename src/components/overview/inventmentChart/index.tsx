import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

interface InvestmentGrowth {
  month: string;
  growth: number;
}

interface InvestmentChartProps {
  data: InvestmentGrowth[];
}

const InvestmentChart: React.FC<InvestmentChartProps> = ({ data }) => {
  // const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(0);

  useEffect(() => {
    if (data.length > 0 ) {
      // setSelectedMonth(parseInt(data[0].month.split('-')[1], 10));
      setSelectedYear(parseInt(data[0].month.split('-')[0], 10));
    }
  }, [data]);

  // const uniqueMonths = Array.from(new Set(latestData.map((item) => item.month.split('-')[1]))).sort();
  const uniqueYears = Array.from(new Set(data.map((item) => item.month.split('-')[0]))).sort();

  const filteredData = data.filter(
    (investmentData) =>
      investmentData.month.startsWith(`${selectedYear}`)
  );

  const chartData = {
    labels: filteredData.map((investmentData) => investmentData.month),
    datasets: [
      {
        data: filteredData.map((investmentData) => investmentData.growth),
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return;
          return getGradient(ctx, chartArea);
        },
        borderColor: "#4DC2E8",
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  const getGradient = (ctx: any, chartArea: any) => {
    var gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradient.addColorStop(0, "rgba(1,17,94,1)");
    gradient.addColorStop(1, "rgba(72,104,215,0)");

    return gradient;
  };

  return (
    <div className="mx-6 my-12 bg-[#01115E] px-8 py-6 rounded-xl">
      <h1 className="text-center text-xl font-semibold pb-8 pt-4">
        Investment Growth
      </h1>

      <div className="flex items-center justify-center mb-8">
        {/* <select
            className="mr-4 p-2 border rounded"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
            style={{ color: 'black' }}
        >
            {uniqueMonths.map((month) => (
            <option key={month} value={month}>
                {month}
            </option>
            ))}
        </select> */}
        <select
            className="p-2 border rounded"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
            style={{ color: 'black' }}
        >
            {uniqueYears.map((year) => (
            <option key={year} value={year}>
                {year}
            </option>
            ))}
        </select>
      </div>

      {/* Chart component */}
      <Line
        options={{
          responsive: true,
          elements: {
            line: {
              tension: 0.1,
            },
            point: {
              radius: 0,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
            },
          },
        }}
        data={chartData}
      />
    </div>
  );
};

export default InvestmentChart;
