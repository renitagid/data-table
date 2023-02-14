import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//Data is mapped and then reversed to display a typical left to right time progression.

export default function LineGraph({ array }) {
  let dates = array.map((obj) => obj.daysAgo).reverse();
  let pxdata = array.map((obj) => obj.pilytixProb).reverse();
  let repdata = array.map((obj) => obj.repProb).reverse();
  const options = {
    scales: {
      y: {
        max: 1,
        min: 0
      },
      x: {
        title: {
          text: "Days Ago",
          display: true
        }
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Probability History: Click to toggle chart/table"
      }
    }
  };

  const data = {
    labels: dates,

    datasets: [
      {
        label: "Pilytix Probability",
        data: pxdata,
        borderColor: "#3792cb",
        backgroundColor: "#45b6fe"
      },
      {
        label: "Rep Probability",
        data: repdata,
        borderColor: "#1c4966",
        backgroundColor: "#296d98"
      }
    ]
  };

  return (
    <div style={{ height: 330 }}>
      <Line
        data={data}
        options={options}
        style={{
          padding: 10,
          margin: 10,
          width: 550,
          height: 310,
          borderStyle: "solid",
          borderWidth: 1
        }}
      />
    </div>
  );
}
