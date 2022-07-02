export default function TableHeader({ tableHead, bg = "" }) {
  return (
    <thead>
      <tr className="">
        {tableHead.map((title, idx) => {
          return (
            <th
              key={idx}
              className={`px-4 py-2 text-lg font-semibold text-center  border rounded-lg border-slate-700 ${bg}`}
            >
              {title == "id" ? "#" : title}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
