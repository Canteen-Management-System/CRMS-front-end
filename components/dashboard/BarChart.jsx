import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
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

  

export default function BarChart({filteredTasks}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  
  const labels = ["January", "February", "March", "April", "May", "June", "July"];
  
    const data = {
    labels,
    datasets: [
      {
        label: "Pending",
        data:[filteredTasks("open","01/2022").length,
              filteredTasks("open","02/2022").length, 
              filteredTasks("open","03/2022").length,
              filteredTasks("open","04/2022").length,
              filteredTasks("open","05/2022").length,
              filteredTasks("open","06/2022").length,
              filteredTasks("open","07/2022").length,
              filteredTasks("open","08/2022").length,
              filteredTasks("open","09/2022").length,
              filteredTasks("open","10/2022").length,
              filteredTasks("open","11/2022").length,
              filteredTasks("open","12/2022").length],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Closed",
        data:[filteredTasks("closed","01/2022").length,
              filteredTasks("closed","02/2022").length, 
              filteredTasks("closed","03/2022").length,
              filteredTasks("closed","04/2022").length,
              filteredTasks("closed","05/2022").length,
              filteredTasks("closed","06/2022").length,
              filteredTasks("closed","07/2022").length,
              filteredTasks("closed","08/2022").length,
              filteredTasks("closed","09/2022").length,
              filteredTasks("closed","10/2022").length,
              filteredTasks("closed","11/2022").length,
              filteredTasks("closed","12/2022").length],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <>
      <div  className="w-1/2  ">
        <Bar options={options} data={data} />
      </div>
    </>
  );
}

