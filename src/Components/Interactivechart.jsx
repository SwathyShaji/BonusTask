import React, { useState, useEffect, useRef } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJs } from "chart.js/auto";
import "../Components/style.css";

const InteractiveChart = () => {
  const [chartType, setChartType] = useState("bar");
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Users Gained",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  // Customization options state
  const [colorScheme, setColorScheme] = useState([
    "rgba(75,192,192,1)",
    "#ecf0f1",
    "#50AF95",
    "#f3ba2f",
    "#2a71d0",
  ]);

  const [axisTitles, setAxisTitles] = useState({
    x: "X Axis",
    y: "Y Axis",
  });

  const [legendPosition, setLegendPosition] = useState("top");

  useEffect(() => {
    const limit = 25; // Change this to the desired limit
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const data = response.data;
        setUserData({
          labels: data.slice(0, limit).map((item) => item.id),
          datasets: [
            {
              label: "Users Gained",
              data: data.slice(0, limit).map((item) => item.userId),
              backgroundColor: colorScheme,
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [colorScheme]);

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const handleColorSchemeChange = (newColorScheme) => {
    setColorScheme(newColorScheme);
  };

  const handleAxisTitlesChange = (axis, newTitle) => {
    setAxisTitles((prevTitles) => ({
      ...prevTitles,
      [axis]: newTitle,
    }));
  };

  const handleLegendPositionChange = (position) => {
    setLegendPosition(position);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: axisTitles.x,
        },
      },
      y: {
        title: {
          display: true,
          text: axisTitles.y,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: legendPosition,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
    animation: {
      duration: 1000, // Set animation duration in milliseconds
    },
  };

  return (
    <div>
      <div>
        <button className="button" onClick={() => handleChartTypeChange("bar")}>
          Bar Chart
        </button>
        <button
          className="button"
          onClick={() => handleChartTypeChange("line")}
        >
          Line Chart
        </button>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <div>
          <label>
            Color Scheme:
            <input
              type="text"
              value={colorScheme.join(",")}
              onChange={(e) =>
                handleColorSchemeChange(e.target.value.split(","))
              }
            />
          </label>
        </div>
        <div>
          <label>
            X Axis Title:
            <input
              type="text"
              value={axisTitles.x}
              onChange={(e) => handleAxisTitlesChange("x", e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Y Axis Title:
            <input
              type="text"
              value={axisTitles.y}
              onChange={(e) => handleAxisTitlesChange("y", e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Legend Position:
            <select
              value={legendPosition}
              onChange={(e) => handleLegendPositionChange(e.target.value)}
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </label>
        </div>
        {chartType === "bar" ? (
          <Bar data={userData} options={options} />
        ) : (
          <Line data={userData} options={options} />
        )}
      </div>
    </div>
  );
};

export default InteractiveChart;
