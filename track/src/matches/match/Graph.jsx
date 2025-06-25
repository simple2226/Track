import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend);
// Register Chart.js components

const Graph = ({size, match}) => {

    const [data_1, set_data_1] = useState(match.innings.first.runs_balls)
    
    const [data2, set_data_2] = useState(match.innings.second.runs_balls)
    
    // Convert the data for Chart.js
    const dataset1 = data_1.map(point => ({ x: point.balls, y: point.runs }));
    const dataset2 = data2.map(point => ({ x: point.balls, y: point.runs }));
    
    const [chartData, setChartData] = useState({
        datasets: [
            {
                label: `${match[match.innings.first.batting]}`,
                data: dataset1,
                borderColor: "#0098d4",
                borderWidth: 2,
                fill: false,
                pointRadius: 0
            },
            {
                label: `${match[match.innings.second.batting]}`,
                data: dataset2,
                borderColor: "red",
                borderWidth: 2,
                fill: false,
                pointRadius: 0
            }
        ]
    })
    
    const [chartOptions, setChartOptions] = useState({
        responsive: true,
        scales: {
            x: {
            type: "linear",
            position: "bottom",
            title: {
                display: true,
                text: "Balls Faced"
            },
            grid: {
                color: "rgba(0, 0, 0, 0.2)", // Darker grid lines for X-axis
            }
            },
            y: {
            title: {
                display: true,
                text: "Runs Scored"
            },
            grid: {
                color: "rgba(0, 0, 0, 0.2)", // Darker grid lines for X-axis
            }
            }
        }
    })
    return (
        <div style={{ width: `${size * 2}px`, height: `${size}px`}} className=''>
        <Line data={chartData} options={chartOptions} />
        </div>
    )
};

export default Graph;