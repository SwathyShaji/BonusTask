import { Chart as ChartJs } from "chart.js/auto";
import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import "../Components/style.css";

/**
 * InteractiveChart Component
 *
 * A React component that displays an interactive chart using Chart.js and react-chartjs-2.
 * Users can switch between Bar and Line chart types and customize the chart appearance.
 *
 */
const InteractiveChart = () => {
  // State for chart type (bar or line)
  const [chartType, setChartType] = useState("bar");

  // State for user data (labels and datasets)
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

  // Fetch data from JSONPlaceholder API
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

  // Handle chart type change
  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  // Handle color scheme change
  const handleColorSchemeChange = (newColorScheme) => {
    setColorScheme(newColorScheme);
  };

  // Handle axis titles change
  const handleAxisTitlesChange = (axis, newTitle) => {
    setAxisTitles((prevTitles) => ({
      ...prevTitles,
      [axis]: newTitle,
    }));
  };

  // Handle legend position change
  const handleLegendPositionChange = (position) => {
    setLegendPosition(position);
  };

  // Chart options for customization
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
      duration: 1000,
    },
  };

  // Render the component
  return (
    <div>
      {/* Chart type buttons */}
      <div>
        <button
          className={`button ${chartType === "bar" ? "active" : ""}`}
          onClick={() => handleChartTypeChange("bar")}
        >
          Bar Chart
        </button>
        <button
          className={`button ${chartType === "line" ? "active" : ""}`}
          onClick={() => handleChartTypeChange("line")}
        >
          Line Chart
        </button>
      </div>

      {/* Chart customization options */}
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

        {/* Render the selected chart type */}
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
