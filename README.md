## React Interactive Chart

A customizable and interactive chart component for React, using Chart.js and Axios for data fetching.

## Getting Started

1. **Install Dependencies:**
   Make sure you have the required dependencies installed:

   ```bash
   npm install react react-dom react-chartjs-2 axios chart.js
2.Import the Component:
Import the InteractiveChart component into your React file:
import InteractiveChart from './path-to/InteractiveChart';
3.Use the Component:
Include the <InteractiveChart /> component in your JSX:
function App() {
  return (
    <div>
      <h1>Your App Title</h1>
      <InteractiveChart />
    </div>
  );
}

export default App;
Customization
The InteractiveChart component provides the following customization options:

Change Chart Type:
Click on the "Bar Chart" or "Line Chart" buttons to switch between bar and line chart types.

Color Scheme:
Adjust the color scheme by entering comma-separated color values in the "Color Scheme" input field.

Axis Titles:
Modify the titles of the X and Y axes by entering new values in the "X Axis Title" and "Y Axis Title" input fields.

Legend Position:
Select the desired legend position from the dropdown list.

Animation Duration:
Adjust the animation duration by modifying the duration property in the options object.

Data Source
The chart fetches data from JSONPlaceholder using Axios. You can replace this API endpoint with your own data source.
Notes
This component is built using React, Chart.js, and Axios.
Feel free to customize and integrate it into your React application.