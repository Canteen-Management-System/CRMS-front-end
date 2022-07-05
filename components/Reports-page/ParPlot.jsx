import { jsPDF } from "jspdf";
import Plot from 'react-plotly.js';
import html2canvas from "html2canvas";
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

  

export default function ParPlot ({filteredTasks}) {
  const createPDF = async () => {   
    const pdf = new jsPDF("portrait", "pt", "a4"); 
    const data = await html2canvas(document.querySelector("#pdf"));
    const img = data.toDataURL("image/png");  
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("shipping_label.pdf");
  };
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
        label: "Open",
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
  <div className="shipping bg-gray-600 flex flex-col justify-center items-center w-1/2 text-white">
    <div id="pdf">
        <Bar options={options} data={data} />
      </div>
      <button onClick={createPDF} type="button">Download</button>

      </div>
    </>
  );
}

