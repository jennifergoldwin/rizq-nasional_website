"use client";
import { Doughnut } from "react-chartjs-2";
import React from "react";
import { formatToMYR } from "@/utils/constant";
interface DoughnutProps {
  totalDeposit: number;
  totalProfit: number;
}

const DoughnutChart: React.FC<DoughnutProps> = ({
  totalDeposit = 0,
  totalProfit = 0,
}) => {
  const chartRef = React.useRef<any>(null);
  const centerTextOptions = React.useRef<{ text: string }>({
    text: `${formatToMYR(totalDeposit + totalProfit)}`,
  });

  React.useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;

      centerTextOptions.current.text = `${formatToMYR(
        totalDeposit + totalProfit
      )}`;
      chartRef.current.update();
      if (chartInstance) {
        // Update the plugin options with the new values
        centerTextOptions.current.text = `${formatToMYR(
          totalDeposit + totalProfit
        )}`;
        chartInstance.update();
      }
    }
  }, [totalDeposit, totalProfit]);

  return (
    <Doughnut
      ref={chartRef}
      options={{ responsive: true, cutout: "70%", aspectRatio: 1.23 }}
      plugins={[
        {
          id: "centerText",
          beforeDraw: (chart: any, args: any) => {
            const { ctx } = chart;
            const { chartArea } = chart;

            if (!chartArea) {
              return;
            }

            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = (chartArea.top + chartArea.bottom) / 2;

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white";
            ctx.font = "24px sans-serif";
            ctx.fillText(centerTextOptions.current.text, centerX, centerY);
          },
        },
      ]}
      data={{
        datasets: [
          {
            data: [totalDeposit, totalProfit],
            backgroundColor: ["#53CF60", "#4768D7"],
            borderWidth: 0,
          },
        ],
      }}
    />
  );
};

export default DoughnutChart;
