import React from "react";
import { Chart } from "react-google-charts";

const options = {
  backgroundColor: "transparent",
  hAxis: {
    textStyle: { color: "white" },
    titleTextStyle: { color: "white" },
  },
  vAxis: {
    textStyle: { color: "white" },
    titleTextStyle: { color: "white" },
  },
  legend: {
    textStyle: { color: "white" },
  },
  titleTextStyle: { color: "white" },
  series: {
    0: { targetAxisIndex: 0, color: "#FFFFFF" },
  },
  curveType: "function",
  chartArea: { left: 50, top: 10, width: "85%", height: "75%" },
};

function LineChart({ chartData }) {
  const data = [["Date", "Avg Price"]];

  if (chartData && chartData.length > 0) {
    chartData.forEach(item => {
      const month = new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      data.push([month, item.avgPrice]);
    });
  } else {
    data.push(["No Data", 0]);
  }

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="200px"
      data={data}
      options={options}
    />
  );
}

export default LineChart;
