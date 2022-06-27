import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import TableBody from "./TableBody";

const HEAD = ["Date", "Category", "Company"];
const BODY_DATA = [
  ["25-06-2022", "RFQ", "ASAC"],
  ["25-06-2022", "RFQ", "ASAC"],
  ["25-06-2022", "RFQ", "ASAC"],
];

export default function RenderTable() {
  return (
    <div>
      <table className="text-white font-poppins">
        <TableHeader tableHead={HEAD} />
        <TableBody BODY_DATA={BODY_DATA} />
        <TableFooter />
      </table>
    </div>
  );
}
