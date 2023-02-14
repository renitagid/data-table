import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from "chart.js";
import MessageTable from "./MessageTable";
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

// The user can toggle between chart and table view via the UseState hook
const BarGraph = ({ wins, losses }) => {
  const [show, setShow] = useState("chart");
  const handleClick = () => {
    if (show === "chart") {
      setShow("table");
    } else if (show === "table") {
      setShow("chart");
    }
  };

  // Factors increasing and decreasing win are merged into a single array to display the data in a cohesive way, because they each contain the same properties
  // Accounts for cards which do not have wins or losses

  let all;
  if (losses && wins) {
    all = [...losses?.concat(wins)];
  } else if (losses) {
    all = losses;
  } else if (wins) {
    all = wins;
  } else return null;

  // the full array is sorted by weight value to display the data in a visually pleasing and informative way so that you can easily see what factors are increasing or decreasing probability of a win

  let sortedWins = all.sort((a, b) =>
    a.weight.value > b.weight.value ? 1 : -1
  );

  // arranging the data for ease of use with the chartjs table

  let winLabels = sortedWins.map((obj) => obj.name);
  let winValues = sortedWins.map((obj) => obj.weight.value);
  let winColors = sortedWins.map((obj) => {
    if (obj.weight.value === 1) {
      return "#c8f0e4";
    } else if (obj.weight.value === 2) {
      return "#6fd7b9";
    } else if (obj.weight.value === 3) {
      return "#2da683";
    } else if (obj.weight.value === -3) {
      return "#bb434c";
    } else if (obj.weight.value === -2) {
      return "#F8797c";
    } else if (obj.weight.value === -1) {
      return "#ffb09c";
    } else return "";
  });

  const data = {
    labels: winLabels,
    datasets: [
      {
        data: winValues,
        backgroundColor: winColors,
        borderColor: winColors,
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Factors Affecting Win: Click to toggle chart/table"
      }
    }
  };

  // The entire div is clickable to toggle between the table and chart, for a quicker user experience

  return (
    <div onClick={handleClick}>
      {show === "table" ? <MessageTable array={all} /> : null}
      {show === "chart" ? (
        <Bar
          data={data}
          options={options}
          style={{
            padding: 10,
            margin: 10,
            width: 550,
            height: 315,
            borderStyle: "solid",
            borderWidth: 1
          }}
        />
      ) : null}
    </div>
  );
};

export default BarGraph;
