import React from "react";
import ReactEcharts from "echarts-for-react";

function TokenomicsChart() {
  const option = {
    title: {
      text: "Tokénomie",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Distribution du token",
        type: "pie",
        radius: "50%",
        data: [
          { value: 50000, name: "Vente publique" },
          { value: 10000, name: "Marketing" },
          { value: 15000, name: "Vente privée" },
          { value: 25000, name: "Récompenses" },
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
      <ReactEcharts option={option} />
    </div>
  );
}

export default TokenomicsChart;
