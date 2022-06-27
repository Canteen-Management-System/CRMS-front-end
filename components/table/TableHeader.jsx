export default function TableHeader({ tableHead }) {
  return (
    <thead>
      <tr className="">
        {tableHead.map((title, idx) => {
          return (
            <th key={idx} className="py-2 text-center ">
              {title}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
