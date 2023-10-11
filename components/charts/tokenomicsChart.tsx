import React from "react";
import ReactEcharts from "echarts-for-react";

function TokenomicsChart() {
  const option = {
    title: {
      text: "Tokenomics",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Token distribution",
        type: "pie",
        radius: "50%",
        data: [
          { value: 50000, name: "Public sale" },
          { value: 10000, name: "Marketing" },
          { value: 15000, name: "Private sale" },
          { value: 25000, name: "Rewards" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div>
      <ReactEcharts option={option} style={{ height: "400px" }} />
    </div>
  );
}

export default TokenomicsChart;
