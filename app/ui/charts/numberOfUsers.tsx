import ReactEcharts from "echarts-for-react";

function NumberOfUsers() {
  const option = {
    title: {
      text: "Nombre d'utilisateurs par mois",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: ["Septembre", "Octobre"],
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
      <ReactEcharts option={option} />
    </div>
  );
}

export default NumberOfUsers;
