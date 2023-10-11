import ReactEcharts from "echarts-for-react";

function NumberOfUsers() {
  const option = {
    title: {
      text: "Number of users per month",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: ["September", "October"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [1, 1],
        type: "line",
      },
    ],
  };

  return (
    <div>
      <ReactEcharts option={option} style={{ height: "400px" }} />
    </div>
  );
}

export default NumberOfUsers;
