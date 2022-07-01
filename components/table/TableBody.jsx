import { TrashIcon } from "@heroicons/react/outline";
export default function TableBody({ bodyData, tableHead , deleteLocation }) {
  let counter = 0;
  return (
    <tbody>
      {bodyData.map((row, rowIdx) => {
        return (
          <tr key={rowIdx}>
            {tableHead.map((head, idx) => {
              return (
                <td
                  key={idx}
                  className="p-1 px-8 py-2 text-center border rounded-lg border-slate-700"
                >
                  {head == "id" ? (counter = counter + 1) : row[head]}
                </td>
                
              );
            })}
            <td className="p-1 text-center border rounded-lg border-slate-700">
                <TrashIcon
                  className="h-6 mx-auto cursor-pointer"
                  onClick={() => deleteLocation(row.id)}
                />
              </td>
          </tr>
        );
      })}
    </tbody>
  );
}
