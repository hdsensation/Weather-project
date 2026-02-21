import React from "react";
import { Contxt } from "./Context";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "5-Day Weather Forecast",
      },
    },
  };

  let val = Contxt();
  let d = val.data || []; // Ensure d is an array
  let labels = [];
  let min = [];
  let max = [];

  d.forEach(e => {
    // Free API structure: main.temp_min and main.temp_max
    min.push(e.main.temp_min);
    max.push(e.main.temp_max);
    
    const n = new Date(e.dt * 1000).toLocaleString("en-us", {
        weekday: "long"
    });
    labels.push(n);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Low Temperature (°C)",
        data: min,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "High Temperature (°C)",
        data: max,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
        <Bar options={options} data={data} />
    </div>
  );
}

export default Chart;