import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import TableBody from "./TableBody";

const HEAD = ["Date", "Category", "Company"];
const BODY_DATA = [
  ["25-06-2022", "RFQ", "ASAC"],
  ["25-06-2022", "RFQ", "ASAC"],
  ["25-06-2022", "RFQ", "ASAC"],
];

export default function RenderTable({ tableHead, bodyData }) {
  return (
    <div>
      <table className="mx-8 text-white font-poppins">
        <TableHeader tableHead={tableHead} />
        <TableBody bodyData={bodyData} tableHead={tableHead} />
        <TableFooter />
      </table>
    </div>
  );
}
