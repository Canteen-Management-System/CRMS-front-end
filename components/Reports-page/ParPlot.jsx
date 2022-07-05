import { jsPDF } from "jspdf";
import Plot from 'react-plotly.js';
import html2canvas from "html2canvas";

export default function BarPlot({ x,y,title }) {
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
      
    return (
    <div className="shipping bg-gray-600 flex flex-col justify-center items-center w-1/2 text-white">
    <div id="pdf">
    <Plot
        data={[
          {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          // {type: 'bar', 
          // x: x, 
          // y:y},
        ]}
        layout={ {width: 500, height: 500, title:title} }
      />
    </div>
    <button onClick={createPDF} type="button">Download</button>
  </div>
  );
}
