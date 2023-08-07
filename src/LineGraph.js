import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import numeral from "numeral";
Chart.register(CategoryScale);

const option = {
  plugins: {
    legend: {
      display: false,
      elements: {
        point: {
          radius: 0,
        },
      },
    },

    maintainAspectRation: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: { display: false },
          ticks: {
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  },
};

function LineGraph() {
  const [data, setData] = useState({});

  useEffect(() => {
    console.log(JSON.stringify(data) === "{}", " MAIN JACK");
    if (JSON.stringify(data) === "{}") {
      fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=60")
        .then((res) => res.json())
        .then((data) => {
          const chartData = buildChartData(data);
          setData(chartData);
        });
    }
  }, [data]);

  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date],
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  return (
    <div>
      <Line
        options={option}
        data={{
          datasets: [
            {
              type: "line",
              label: "",
              backgroundColor: "rgbg(204,16,52,0)",
              borderColor: "#cc1034",
              data: data,
            },
          ],
        }}
      />
    </div>
  );
}

export default LineGraph;
