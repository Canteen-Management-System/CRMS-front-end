import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

 

export default function PieChart({filterServiceType}) {
    const data = {
        labels: ["complaint", "offer", "Request","suggestions"],
        datasets: [
          {
            label: "# of Votes",
            data: [filterServiceType("complaint").length,
                   filterServiceType("offer").length,
                   filterServiceType("Request").length,
                   filterServiceType("suggestions").length],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            
            ],
            borderWidth: 1,
          },
        ],
      };
  return (
    <>
      <div className="w-1/4 " >
        <Pie data={data} />
      </div>
    </>
  );
}
